<template>
    <div class="background">
        <form @submit.prevent="login">
            <h3>Zaloguj się</h3>
            <label for="email">Adres Email</label>
            <input type="text" placeholder="Adres email" v-model="email" id="email">
            <label for="password">Hasło</label>
            <input type="password" placeholder="hasło" v-model="password" id="password">
            <button class="login" @click="login">Zaloguj</button>
        </form>
    </div> 
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router'

const email = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref();

const login = () =>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Successfully signed in");
            console.log(data);
            console.log(auth.currentUser);
            router.push('/')
        })
        .catch((error) => {
            console.log(error.code);
            switch (error.code){
                case "auth/invalid-email":
                    errMsg.value = "Invalid email";
                    break;
                case "auth/user-not-found":
                    errMsg.value = "No account with that email found";
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Invalid password";
                    break;
                default:
                    errMsg.value = "Email or password was incorrect";
                    break;
            }
        });
};

</script>

<style scoped>
@import '@/css/bootstrap.min.css';

form{
    height: 470px;
    width: 400px;
    max-width: 400px;
    background-color: #dee2e6;
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    color: black;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 40px;
}
@media screen and (max-width: 470px) {
    form{
        width: 320px;
    }
}
form *{
    font-family: 'Poppins',sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}
form h3{
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
}

label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}
form h3,
label {
    color: black;
}
input::placeholder {

    color: black; 
    color: rgba(255, 255, 255, 0.7);
}

input {
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    border: 1px solid rgba(255, 255, 255, 0.3); 
    color: black; 
}


.login{
    margin-top: 20px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
}

</style>
