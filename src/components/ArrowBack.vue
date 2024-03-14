<template>
    <div class="arrowback"></div>
</template>

<style>
.arrowback{
    position: absolute;
    background-size: cover;
    background-position: 50% 50%;
    background-image: url("../assets/arrowback.png");
    height: 60px;
    width: 60px;
    top:8px;
    left: 2px;
}
.arrowback:hover{
  transform: scale(1.12);
  transition: 0.4s;
}
</style>