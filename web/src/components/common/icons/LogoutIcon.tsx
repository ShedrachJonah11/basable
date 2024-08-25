import { SvgIcon } from "@mui/material";
import * as React from "react";

export const LogoutIcon = ({ color = "#363636" }) => {
  return (
    <SvgIcon>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.6509 4.69386C14.3252 4.39046 13.7977 4.39046 13.4732 4.69386C13.1476 4.99725 13.1476 5.48874 13.4732 5.79112L17.1582 9.22741H6.56016C6.09885 9.22741 5.72656 9.57427 5.72656 10.0041C5.72656 10.4339 6.09885 10.7808 6.56016 10.7808H17.1582L13.4701 14.2142C13.1445 14.5176 13.1445 15.0091 13.4701 15.3115C13.634 15.4642 13.8457 15.539 14.0595 15.539C14.2733 15.539 14.4872 15.4642 14.6489 15.3115L19.7558 10.5533C20.0814 10.2499 20.0814 9.7584 19.7558 9.45601L14.6509 4.69386Z"
          fill="#363636"
        />
        <path
          d="M4.61517 10.0044C4.61517 9.0022 5.48459 8.19214 6.56023 8.19214H11.1114V4.35535C11.1114 3.06896 10.1834 1.94037 8.85266 1.60047L3.88469 0.108805C3.87058 0.103748 3.85647 0.100714 3.84019 0.0956577C2.91542 -0.131886 1.94831 0.0511617 1.19179 0.595244C0.433082 1.13933 0 1.96456 0 2.85551V17.1441C0 18.035 0.433082 18.8603 1.19179 19.4043C1.73666 19.7957 2.38684 20 3.05327 20C3.31486 20 3.57861 19.9687 3.8391 19.9039C3.85322 19.9009 3.86733 19.8958 3.88361 19.8908L8.85157 18.4021C10.1823 18.0654 11.1103 16.9368 11.1103 15.6473L11.1114 11.8164H6.56024C5.48459 11.8164 4.61517 11.0066 4.61517 10.0044Z"
          fill="#363636"
        />
      </svg>
    </SvgIcon>
  );
};