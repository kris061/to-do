"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const registerUserBtn2 = document.querySelector(".registerUserBtn");
function registerUser2() {
    return __awaiter(this, void 0, void 0, function* () {
        var registerUsernameInput = document.querySelector("#register");
        var registerPasswordInput = document.querySelector("#password");
        var registerConfirmPasswordInput = document.querySelector("#confirmpassword");
        const registerData = {
            username: registerUsernameInput.value,
            password: registerPasswordInput.value,
            confirmPassword: registerConfirmPasswordInput.value
        };
        fetch("http://localhost:3000/user/register", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(registerData)
        }).then(response => response.json());
    });
}
registerUserBtn2.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () { return yield registerUser2(); }));
