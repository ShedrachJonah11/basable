use axum::{
    async_trait,
    extract::{FromRef, FromRequestParts},
    http::{header::AUTHORIZATION, request::Parts, StatusCode},
    RequestPartsExt,
};

use crate::base::{
    user::decode_jwt,
    AppError,
};
use crate::http::app::AppState;

/// Extracts information about the current `User` by inspecting the Authorization
/// header. If Authorization is not provided, it checks for `B-Session-Id`, which should
/// be provided for guest users. If none of this is found, the `User` is `None`.
pub(crate) struct AuthExtractor(pub Option<String>);

#[async_trait]
impl<S> FromRequestParts<S> for AuthExtractor
where
    AppState: FromRef<S>,
    S: Send + Sync,
{
    type Rejection = AppError;

    async fn from_request_parts(parts: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
        let mut is_guest = false;

        // Extract app state and get basable instance
        // https://docs.rs/axum/0.6.4/axum/extract/struct.State.html#for-library-authors
        let state = parts
            .extract_with_state::<AppState, _>(state)
            .await
            .unwrap();

        let mut bsbl = state.instance.lock().unwrap();
        let mut auth_value = parts.headers.get(AUTHORIZATION);

        // If Authorization header does not exist, use session-id to retrieve guest user.
        if let None = auth_value {
            is_guest = true;
            auth_value = parts.headers.get("B-Session-Id");
        }

        if let Some(hv) = auth_value {
            let mut user_id = None;

            if is_guest {
                match decode_jwt(hv) {
                    Ok(id) => user_id = Some(id),
                    Err(e) => {
                        if let Some(id) = user_id {
                            bsbl.log_user_out(&id);
                        }

                        return Err(e);
                    }
                };
            } else {
                // validate user from remote server
                let err = AppError::new(StatusCode::NOT_IMPLEMENTED, "Authorization for registered users not implemented. Please use 'B-Session-Id' header.");
                return Err(err);
            }
            return Ok(AuthExtractor(user_id))
        } else {
            let err = AppError::new(StatusCode::UNAUTHORIZED, "User authentication not provided.");
            return Err(err);
        }

    }
}