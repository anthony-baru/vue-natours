<template>
    <v-row>
        <v-col
                cols="12"
                sm="12"
                md="6"

        >
            <v-date-picker
                    v-model="dates"
                    multiple
                    :min="new Date().toISOString().substr(0, 10)"
            ></v-date-picker>
        </v-col>
        <v-col
                cols="12"
                sm="12"
                md="6"

        >
            <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="dates"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-combobox
                            v-model="dates"
                            multiple
                            chips
                            small-chips
                            label="Start Dates"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                    ></v-combobox>
                </template>
                <v-date-picker
                        v-model="dates"
                        multiple
                        no-title
                        scrollable
                >
                    <v-spacer></v-spacer>
                    <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(dates)"
                    >
                        OK
                    </v-btn>
                </v-date-picker>
            </v-menu>
        </v-col>
    </v-row>
</template>
<script>
    import {format} from "date-fns"

    export default {
        name: "StartDatesSelect",
        data() {
            return {
                // dates: this.startDates,
                menu: false,
            }
        },
        created() {
            this.setStartDates()
        },
        props: {
            startDates: {
                type: Array,
                required: true
            }
        },
        computed: {
            dates: {
                get: function () {
                    return this.$store.getters["manageTour/getStartDates"]
                },
                set: function (newVal) {
                    console.log(newVal, "NEW DATE")
                    return this.$store.commit("manageTour/setStartDates", newVal)
                }
            }
        },
        methods: {
            setStartDates() {
                let dates = this.startDates.map(date => {
                    return format(new Date(date), "yyyy-MM-dd")
                })
                return this.$store.commit("manageTour/setStartDates", dates)
            }
        }
    }
</script>

<style scoped>

</style>