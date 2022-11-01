<template>
    <div>
        <button type="button" class="btn btn-primary m-2 fload-end"
        data-bs-toggle="modal"
        data-bs-target="#modalKurs" @click="addKurs()">Dodaj kurs</button>
        <table class="table table-stripped justify-content-center">
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Svi ucesnici</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="k in Kursevi">
                    <td>{{k.nazivKursa}}</td>
                    <td>
                        <button type="button" class="btn btn-light mr-1" 
                        data-bs-toggle="modal" data-bs-target="#modalKurs" @click="prikazStudenataNaKursu(k)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection" viewBox="0 0 16 16">
                            <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"/>
                            </svg>
                        </button>     
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal fade" id="modalKurs" tabindex="-1" aria-labelledby="kursModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel">{{modalNaslov}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="close"></button>
                    </div>
                    <div class="modal-body">
                        <div v-if="kursId!=0">
                            <table class="table table-stripped justify-content-center">
                                <thead>
                                    <tr>
                                        <th>Ime ucesnika</th>
                                        <th>Prezime ucesnika</th>
                                    </tr>
                                </thead>
                                <tbody v-for="sk in StudentiNaKursu">
                                    <tr v-for="s in Studenti" v-if="s.studentId == sk.studentId && sk.kursId == kursId">
                                        <td>{{s.ime}}</td>
                                        <td>{{s.prezime}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-if="kursId==0">
                            <label class="input-group-text">Naziv novog kursa:</label>
                            <input type="text" class="form-control" v-model="nazivKursa"> <br>
                            <h5>Studenti na novom kursu</h5>
                            <table class="table table-stripped justify-content-center">
                                <thead>
                                    <tr>
                                        <th>Ime ucesnika</th>
                                        <th>Prezime ucesnika</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody v-for="sk in NoviStudentiNaKursu">
                                    <tr>
                                        <td>{{sk.ime}}</td>
                                        <td>{{sk.prezime}}</td>
                                        <td>
                                            <button class="btn btn-primary" @click="skiniStudentaSaListe(sk)">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table> <br>
                            <h5>Svi studenti</h5>
                            <table class="table table-stripped justify-content-center">
                                <thead>
                                    <tr>
                                        <th>Ime ucesnika</th>
                                        <th>Prezime ucesnika</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody v-for="sk in NoviStudentiKojiNisuNaKursu">
                                    <tr>
                                        <td>{{sk.ime}}</td>
                                        <td>{{sk.prezime}}</td>
                                        <td>
                                            <button class="btn btn-primary" @click="dodajStudentaNaListu(sk)">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button type="button" v-if="kursId==0" class="btn btn-primary" @click="kreirajKursSaStudentima()">Kreiraj</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  data () {
    return {
      Kursevi:[],
      Studenti:[],
      StudentiNaKursu:[],
      NoviStudentiNaKursu:[],
      NoviStudentiKojiNisuNaKursu:[],
      kursId:0,
      nazivKursa:"",
      modalNaslov:"",
      studentId:1,
      zadnjiKursId:0
    }
  },
  methods:{
    created(){
            axios.get(`https://localhost:44379/api/Students/sviStudenti`)
            .then((res)=>{
                this.Studenti=res.data;
                this.NoviStudentiKojiNisuNaKursu=res.data;
                console.log(this.students);
            });
            axios.get(`https://localhost:44379/api/Kurs/sviKursevi`)
            .then((res)=>{
                this.Kursevi=res.data;
                console.log(this.students);
            });
            axios.get(`https://localhost:44379/api/Kurs/sviUcesniciKurseva`)
            .then((res)=>{
                this.StudentiNaKursu=res.data;
                console.log(this.students);
            });
        },
        prikazStudenataNaKursu(k){
            this.kursId=k.kursId;
            this.nazivKursa=k.nazivKursa;
            this.modalNaslov="Ucesnici kursa " + this.nazivKursa;
        },
        addKurs(){
            this.kursId=0;
            this.modalNaslov = "Kreiranje novog kursa";
            this.nazivKursa = "";
        },
        dodajStudentaNaListu(sk){
            this.NoviStudentiNaKursu.push({
                studentId: sk.studentId,
                ime: sk.ime,
                prezime: sk.prezime,
                godina: sk.godina,
                statusId: sk.statusId
            });
            let index = this.NoviStudentiKojiNisuNaKursu.findIndex(object => {
                return object.studentId === sk.studentId;
            });
            this.NoviStudentiKojiNisuNaKursu.splice(index,1);
        },
        skiniStudentaSaListe(sk){
            this.NoviStudentiKojiNisuNaKursu.push({
                studentId: sk.studentId,
                ime: sk.ime,
                prezime: sk.prezime,
                godina: sk.godina,
                statusId: sk.statusId
            });
            const index = this.NoviStudentiNaKursu.findIndex(object => {
                return object.studentId === sk.studentId;
            });
            this.NoviStudentiNaKursu.splice(index,1);
        },
        kreirajKursSaStudentima(){
            axios.get(`https://localhost:44379/api/Kurs/sviKursevi`)
            .then((res)=>{
                this.Kursevi=res.data;
                console.log(this.students);
            });  
            axios.post('https://localhost:44379/api/Kurs/dodajKurs', {
                nazivKursa: this.nazivKursa
            })
            .then(response => console.log(response))
            .catch(error => {
                console.error('There was an error!', error);
            });
            this.zadnjiKursId = this.Kursevi.length + 1;
            this.NoviStudentiNaKursu.forEach((obj, index)=>{
                axios.post('https://localhost:44379/api/Kurs/upisStudentaNaKurs', {
                studentId: obj.studentId,
                kursId: this.zadnjiKursId
                })
                .then(response => console.log(response))
                .catch(error => {
                    console.error('There was an error!', error);
                });
            });
            window.location.reload(); 
        },
    },
    mounted:function(){
        this.created();
    }        
}
</script>