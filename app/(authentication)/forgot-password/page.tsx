import React from "react";
import type { NextPage } from "next";

import ForgotPasswordWrapper from "./ForgotPasswordWrapper";
import { authenticateUserAfterLogin } from "@/app/_helper/authenticateUser";

const ForgotPasswordPage: NextPage = async () => {
    await authenticateUserAfterLogin();
    return (
        <div>
            <ForgotPasswordWrapper />
        </div>
    );
};

export default ForgotPasswordPage;
