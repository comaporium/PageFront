<template>
    <div>
        <button type="button" class="btn btn-primary m-2 fload-end"
        data-bs-toggle="modal"
        data-bs-target="#modal" @click="addClick()">Dodaj studenta</button>
        <table class="table table-stripped justify-content-center">
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Opcije</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="s in students">
                    <td>{{s.ime}}</td>
                    <td>{{s.prezime}}</td>
                    <td>
                        <button type="button" class="btn btn-light mr-1"
                        data-bs-toggle="modal" data-bs-target="#modal" @click="infoClick(s)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                        <button type="button" class="btn btn-light mr-1"
                        data-bs-toggle="modal" data-bs-target="#modal" @click="editClick(s)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                            </svg>
                        </button>  
                        <button type="button" class="btn btn-light mr-1" @click="deleteClick(s.studentId)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>     
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="detaljiModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel">{{modalNaslov}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="close"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <label class="input-group-text">Broj indexa:</label>
                            <input type="number" class="form-control" v-model="brojIndexa" v-bind:readonly="isReadOnly"> <br>
                            <label class="input-group-text">Ime:</label> 
                            <input type="text" class="form-control" v-model="ime" v-bind:readonly="isReadOnly"> <br>
                            <label class="input-group-text">Prezime:</label>
                            <input type="text" class="form-control" v-model="prezime" v-bind:readonly="isReadOnly"> <br>
                            <label class="input-group-text">Godina:</label>
                            <input type="number" max="5" min="1"  class="form-control" v-model="godina" v-bind:readonly="isReadOnly"><br>
                            <label class="input-group-text">Status studenta:</label>
                            <select v-model="statusId" :disabled="isReadOnly" class="input-group-text">
                                <option class="form-control" v-for="x of statusStudenata" :key="x.statusId" :value="x.statusId" >{{x.nazivStatusa}}</option>
                            </select><br>
                            <div v-if="isReadOnly">
                                <label class="input-group-text">Kursevi:</label> 
                                <ul v-for="st in kurseviPoStudentu">
                                    <li v-for="k in kursevi" v-if="st.studentId == studentId && st.kursId == k.kursId">{{k.nazivKursa}}</li>
                                </ul>
                            </div>
                            <br>
                        </div>
                        <button type="button" v-if="studentId==0" class="btn btn-primary" @click="kreirajStudenta()">Kreiraj</button>
                        <button type="button" v-if="studentId!=0 && edit==true" class="btn btn-primary" data-bs-dismiss="modal" @click="updateStudenta()">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return{
      edit:false,
      kursevi:[],
      kurseviPoStudentu:[],
      isReadOnly:true,
      students: [],
      statusStudenata:[],
      modalNaslov:"",
      studentId:0,
      brojIndexa:1,
      ime:"",
      prezime:"",
      godina:1,
      statusId:1,
      statusStudenta:null
    }
  },
  methods:{
        created(){
            axios.get(`https://localhost:44379/api/Students/sviStudenti`)
            .then((res)=>{
                this.students=res.data;
                console.log(this.students);
            });
            axios.get(`https://localhost:44379/api/Students/vrsteStatusaStudenta`)
            .then((res)=>{
                this.statusStudenata=res.data;
                console.log(this.students);
            });
            axios.get(`https://localhost:44379/api/Kurs/sviKursevi`)
            .then((res)=>{
                this.kursevi=res.data;
                console.log(this.students);
            });
            axios.get(`https://localhost:44379/api/Kurs/sviUcesniciKurseva`)
            .then((res)=>{
                this.kurseviPoStudentu=res.data;
                console.log(this.students);
            });
        },
        addClick(){
            this.modalNaslov="Add student";
            this.studentId=0;
            this.brojIndexa=1;
            this.ime="";
            this.prezime="";
            this.godina=1;
            this.statusId=1;
            this.isReadOnly=false;
        },
        editClick(s){
            this.modalNaslov="Edit student";
            console.log(s);
            this.studentId=s.studentId;
            this.brojIndexa=s.brojIndexa;
            this.ime=s.ime;
            this.prezime=s.prezime;
            this.godina=s.godina;
            this.statusId=s.statusId;
            this.isReadOnly=false;
            this.edit=true;
        },
        infoClick(s){
            this.modalNaslov="Info studenta " + s.ime;
            console.log(s);
            this.studentId=s.studentId;
            this.brojIndexa=s.brojIndexa;
            this.ime=s.ime;
            this.prezime=s.prezime;
            this.godina=s.godina;
            this.statusId=s.statusId;
            this.edit=false;
            this.isReadOnly=true;
        },
        updateStudenta(){
            axios.post('https://localhost:44379/api/Students/updateStudenta?id='+ this.studentId +'&brojindexa='+this.brojIndexa+'&ime='+this.ime+'&prezime='+this.prezime+'&godina='+this.godina+'&statusid='+this.statusId)
                .then(response => console.log(response))
                .catch(error => {
                    console.error('There was an error!', error);
                });
            window.location.reload();
        },
        kreirajStudenta(){
            axios.post('https://localhost:44379/api/Students/upisStudenta', {
                brojIndexa: parseInt(this.brojIndexa),
                ime: this.ime,
                prezime: this.prezime,
                godina: parseInt(this.godina),
                statusId: parseInt(this.statusId)
            })
                .then(response => console.log(response))
                .catch(error => {
                    console.error('There was an error!', error);
                });
            window.location.reload();  
        },
        deleteClick(id){
        if(confirm("Do you want to delete a student under ID " + id +"?")){
            axios.delete("https://localhost:44379/api/Students/obrisiStudenta/"+id)
            .then(response=>console.log(response))
            .catch(error=>console.log(error))
            window.location.reload();
        }
         else 
          alert("Student under ID " + id +" not deleted.")
      },
    },
    mounted:function(){
        this.created();
    }
  }
</script>