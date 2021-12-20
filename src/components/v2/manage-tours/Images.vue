<template>
    <div>
        <v-file-input v-model="images" small-chips show-size  label="Images" :rules="rules" multiple @change="change"></v-file-input>
        <v-container class="d-flex flex-row">
            <v-row>
            <v-col cols="6" sm="4" md="2" v-for="(imageUrl,i) in imageUrls" :key="i">
                <v-avatar>
                    <v-img :src="imageUrl"></v-img>
                </v-avatar>
                <p>Image {{i+1}}</p>
            </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "Images",

        data() {
            return {
                imageUrls: [],
            }
        },
        props:['existingImages','rules'],
       async mounted() {
            if(this.existingImages.length>0){
                let existingImageFiles=[]
                let existingImageUrls=[]

                if (!this.existingImages[0].name){
                    existingImageUrls = this.existingImages.map(imageName => {
                        return `${process.env.VUE_APP_API_BASE_URL}/img/tours/${imageName}`
                    })
                    for (const [i,imageUrl] of existingImageUrls.entries()) {
                      existingImageFiles.push(await this.convertImageUrlToFile(this.existingImages[i],imageUrl))
                    }

                }else if(this.existingImages[0].name){
                    existingImageUrls=this.createImages(this.existingImages)
                    existingImageFiles = this.existingImages
                }
                this.imageUrls=existingImageUrls
                this.images=existingImageFiles
            }
        },
        computed:{
          images:{
              get(){
                  return this.$store.getters["manageTour/getImages"]
              },
              set(newVal){
                  return this.$store.commit("manageTour/setImages",newVal)
              }
          }
        },
        methods: {
            change(files) {
                this.imageUrls = this.createImages(files)
            },
            createImages(files) {
                const imageUrls = [];
                files.forEach(file => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        imageUrls.push(e.target.result);
                    };
                    reader.readAsDataURL(file);
                })
                return imageUrls
            },
            async convertImageUrlToFile(fileName,url){
                let response= await fetch(url,{mode:"no-cors"})
                const contentType = response.headers.get('content-type')
                const blob = await response.blob()
                return new File([blob], fileName, { contentType })
            }
        }
    }
</script>

<style scoped>

</style>