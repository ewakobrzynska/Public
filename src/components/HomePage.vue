<template>
  <v-container fluid class="container-padding">
        <v-row class="pa-0 ma-0">
          <v-col lg="6" md="6" sm="6" cols="12" class="pa-0 ma-0">
            <router-link to="page1" class="pa-0 ma-0">
              <div class="field1"><div class="text-center">1</div></div>
            </router-link>
          </v-col>
          <v-col lg="6" md="6" sm="6" cols="12" class="pa-0 ma-0">
            <router-link to="page2" class="pa-0 ma-0">
              <div class="field2"><div class="text-center">2</div></div>
            </router-link>
          </v-col>
          <v-col lg="6" md="6" sm="6" cols="12" class="pa-0 ma-0">
            <router-link to="page3" class="pa-0 ma-0">
              <div class="field3"><div class="text-center">3</div></div>
            </router-link>
          </v-col>
          <v-col lg="6" md="6" sm="6" cols="12"  class="pa-0 ma-0">
            <router-link to="settings" class="pa-0 ma-0">
             <div class="field4"><div class="text-center">4</div></div>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default({
  name : 'HomePage',
  data(){
    return {
    };
  }
  
});

</script>

<style scoped>
.text-center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 40px;
    margin-right: -50%;
    transform: translate(-50%, -50%);
}
.container-padding{
  margin-top: 0px;
  padding-top: 8px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
}
@media screen and (max-width: 600px) {
  .container-padding{
    padding-top: 0px;
  }
}
.field1, .field2, .field3, .field4{
  transition-duration: 0.4s;
  color: white;
  border-radius: 20px;
  background-size: cover;
  background-position: 50% 50%;
  border: 7px solid white;
  min-height: 49vh;
  max-height: 50%;
  position: relative;
}
.field1{
  background-color: orange;
}
.field2{
  background-color: green;
}
.field3{
  background-color: blue;
}
.field4{
  background-color: red;
}
.field1:hover, .field2:hover, .field3:hover, .field4:hover {
  transform: scale(1.02);
}
a:link, a:visited, a:hover, a:active {
  text-decoration: none;
}
@media screen and (max-width: 600px) {
  .field1, .field3{
    margin-left: 0px;
  }
}
@media screen and (max-width: 600px) {
  .field2, .field4{
    margin-right: 0px;
  }
}
</style>