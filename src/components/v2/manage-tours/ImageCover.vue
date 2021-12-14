<template>
    <div>
        <v-file-input :rules="[ v => !!v || 'File is required']" v-model="image"  small-chips label="Image Cover" show-size  @change="change">
        </v-file-input>
        <v-avatar>
            <img v-if="imageUrl" :src="imageUrl" alt="">
        </v-avatar>
    </div>
</template>

<script>
    export default {
        name: "ImageCover",
        data(){
            return {
                imageUrl: "",
                originalFilename:this.existingImageName,
                originalFileUrl:`${process.env.VUE_APP_API_BASE_URL}/img/tours/${this.existingImageName}`
            }
        },
        computed: {
            image: {
                get: function () {
                    return this.$store.getters["manageTour/getImageCover"]
                },
                set: function (newVal) {
                    return this.$store.commit("manageTour/setImageCover",newVal)

                },
            }
        },
        props:['existingImageName','rules'],
        async mounted() {
            if(this.originalFilename && !this.originalFilename.name) {
                this.image = await this.convertImageUrlToFile(this.originalFilename, this.originalFileUrl)
                this.imageUrl=`${process.env.VUE_APP_API_BASE_URL}/img/tours/${this.originalFilename}`
            }else if(this.originalFilename.name){
                this.createImage(this.originalFilename)
            }

        },
        methods:{
            change(file){
                if (!file) {
                    this.imageUrl=""
                    return;
                }
                this.createImage(file);
            },
            createImage(file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.imageUrl = e.target.result;
                };

               reader.readAsDataURL(file);
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