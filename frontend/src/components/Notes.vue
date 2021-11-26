<template>
    <div id="notes-component">
        <v-container>
            <div v-for="(note, counter) in notes" :key="counter">
                    <v-row>
                        <v-col class="mb-4" justify="end">
                        </v-col>
                        <v-col>
                            <v-container>
                                <v-row>
                                    <v-checkbox v-model="note.check" @click="deleteNotes(counter)"></v-checkbox>
                                    <p class="text">{{counter}}. {{note.note}}</p>
                                </v-row>
                            </v-container>
                            
                        </v-col>
                    </v-row>
            </div>
            <v-row>
                <v-col>
                
                </v-col>
                <v-col>
                    <v-text-field v-model="note" hint="Delete notes with the checkbox" label="Add notes..."></v-text-field>
                </v-col>
                <v-col>
                    <v-btn @click="addNote()" color="green">Add</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import api from "../methods/api.js"
export default {
    mixins: [api],
    data () {
        return {
            notes: [],
            note: "",
            end: "end",
            color: "red"
        }
    },
    methods: {
        async addNote(){            
            await this.fatch("addNote", this.note)
            this.getNotes()
        },
        async deleteNotes(counter){
            this.notes[counter].color = "red";
            console.log(this.notes[counter])
            await this.fatch("deleteNote", counter)
            this.getNotes()
        },
        async getNotes(){
            console.log("ds")
            this.notes = []
            var res = await this.fatch("getNotes")
            res.forEach(element => {
                console.log(element)
                this.notes.push({"note":element, "check": false})
            });
            console.log(this.notes)
            console.log(res)
            //this.notes = res;
        }
    },
    created () {
        this.getNotes()
    },
    
}
</script>

<style>

.text{
    margin: 20px;
}

</style>