<script>

export default {
  name: 'AdminPanelView',
};
</script>

<template>
    <div>
    <!DOCTYPE html>
    <html lang="pl">
    <head>
        <meta charset="utf-8" />
        <meta http-euiv="X-UA-Compatible" content="IE-edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>System rezerwacji</title>
        <link rel="stylesheet" href="form.css">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    </head>

    <body>

    <!--------------MENU----------->
    <nav>
        <div class="container nav_container">
            <a href="index.html"><h4>SYSTEM REZERWACJI</h4></a>
            <ol class="nav_menu">
                <router-link to="/adminpanel" class="pa-0 ma-0">
                <li><a class="btn-admin" href=".html">Zaloguj jako administrator</a></li>
                </router-link>
            </ol>
        </div>
    </nav>

    <!-------------FORM-------------->
    <section class="form">
        <div class="container form_container">
            <aside class="aside_image">
                <div class="aside_image">
                    <img src="https://www.svgrepo.com/show/415380/online-exam-test.svg">
                </div>
                <h2>Dokończ rezerwacje wypełniając formularz.</h2>
            </aside>

            <form class="res_form">
                <div class="form_name">
                    <input type="text" name="Imię" placeholder="Imię" required>
                    <input type="text" name="Nazwisko" placeholder="Nazwisko" required>
                    <input type="email" name="E-mail" placeholder="E-mail" required>
                </div>
                <input type="room" name="Pokój" placeholder="" required>
                <input type="time" name="Czas" placeholder="" required>
                <button type="button" class="btn btn-reserve">Rezerwuj</button>
            </form>
        </div>
    </section>

    <!------------STOPKA-------------->
    <footer class="footer">
        <div class="container footer_container">
            <div class="footer_location">
                <p>Lokalizacja:</p>
                <p>ul. Stanisława Łojasiewicza 11, 00-000 Kraków</p>
            </div>
            <div class="footer_contact">
                <p>Informacje kontaktowe:</p>
                <p>Email: kontakt@systemrezerwacji.pl</p>
                <p>Telefon: 123 456 789</p>
            </div>
        </div>
    </footer>
    </body>
    </html>
  </div>
</template>

<style>
*{
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    text-decoration: none;
    list-style: none;
    box-sizing: border-box;
}

:root{
    --color-primary: #3c8ae8;
    --color-danger: #2f69af;
    --color-white: #fff;
    --color-light: rgba(255,255,255,0.7);
    --color-black: #000;
    --color-bg: #fdfffb;
    --color-bg1: #ffffff;
    --color-bg2: #969695;

    --container-width-lg:89%;
    --container-width-md: 90%;
    --container-width-sm: 94%;

    --transition: all 400ms ease;
}

body{
    font-family: 'Montserrat', sans-serif;
    line-height: 1.7;
    background: var(--color-bg);
}

.container{
    width: var(--container-width-lg);
    margin: 0 auto;
}

section{
    padding: 3rem 0;
}

section h2{
    text-align: center;
    margin-bottom: 4rem;
}

h1,h2,h3,h4,h5{
    line-height: 1.2;
}
h1{
    font-size: 2.4rem;
}
h2{
    font-size: 2rem;
}
h3{
    font-size: 1.6rem;
}
h4{
    font-size: 1.4rem;
}

a{
    color: var(--color-white);
}

img{
    width: 100%;
    display: block;
    object-fit: cover;
}

/*PRZYCISKI*/
.btn-admin{
    background: var(--color-primary); 
    color: var(--color-white);
    padding: 1rem 3rem; 
    border: 1px solid transparent;
    font-weight: 500;
}

.btn-admin:hover{
    background: var(--color-danger);
}

.btn-reserve{
    background: var(--color-danger); 
    color: var(--color-white);
    padding: 1rem 2rem;
    border: 1px solid transparent;
    font-weight: 500;
}

.btn-reserve:hover{
    background: var(--color-primary); 
}


/*NAVBAR*/
nav{
    background: var(--color-bg2);
    width: 100vw;
    height: auto;
    padding:1rem;
    position: fixed;
    top: 0;
    z-index: 1;
}

.nav_container{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
nav button{
    display: none;
}

.nav_menu{
    display: flex;
    align-items: center;
    gap: 9rem;
}

.nav_menu a{
    font-size: 0.9rem;
    transition: var(--transition);
}

.nav_menu a:hover{
    color: var(--color-bg2);
    background-color:#1c4383;
}

.nav_menu .icon {
    display: none;
}

/*STOPKA*/
.footer{
    background: var(--color-bg2);
    padding-top: 2rem;
    font-size: 0.9rem;
}

.footer_container{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap:8rem;
}

.footer_container > div h4{
    margin-bottom: 0.5rem;
}

footer ul li{
    margin-bottom: 0.7rem;
}

footer ul li a:hover{
    text-decoration: underline;
}

.footer_copyright{
    text-align: center;
    padding: 1.2rem 0;
}

/*FORMULARZ*/
.form_container{
    background: var(--color-bg1);
    padding: 4rem;
    display: grid;
    grid-template-columns: 40% 60%;
    gap: 4rem;
    height: 30rem;
    margin: 7rem auto;
    border-radius: 1rem;
}

.aside_image{
    width: 25rem;
    margin-bottom: 1rem;
}

.res_form{
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-right: 4rem;
}

.form_name{
    display: flex;
    gap: 1.2rem;
}

.contact_form input[type="text"]{
    width: 50%;
}

input,textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid var(--color-primary);
    background: var(--color-bg);
    color: var(--color-black);
}
</style>