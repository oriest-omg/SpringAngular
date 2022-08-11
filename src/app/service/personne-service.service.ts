import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personne } from 'src/app/model/personne.model';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/model/departement.mode';

@Injectable({
	providedIn: 'root',
})
export class PersonneServiceService {

	private api: String = 'http://localhost:8080/api';
	personnes: Personne[] = [];

	constructor(private http: HttpClient, private toast: ToastrService) {
	}

	getPersonnes() {
		return this.http.get(this.api + '/users');
	}

	getDepartements() {
		return this.http.get(this.api + '/departement');
	}
	getDepartement(designation: string) {
		return this.http.get(this.api + '/departement/' + designation);
	}

	getPersonne(id: string) {
		return this.http.get(this.api + '/user/' + id);
	}


	addPersonne(idd: string, nom: string, prenom: string, agee: string, departement : Departement) {
		var id = parseInt(idd);
		var age = parseInt(agee);
		const obj = {
			id, nom, prenom, age,departement
		};
		console.log(obj);
		return this.http.post(this.api + '/add-personne', obj)
				.subscribe(result => {
							console.log(result);
						},
						error => {
							this.toast.error('Veuillez vérifier les information', 'erreur');
							// this.errors = error;
						},
						() => {
							this.toast.success('Enregistrer', 'succès');
						});
	}

	deleteTelPersonne(id: string | undefined) {
		this.http.delete(`${this.api}/delete-personne/${id}`)
				.subscribe(result => {
							console.log(result);
						},
						error => {
							this.toast.error('Veuillez vérifier les information', 'erreur');
							// this.errors = error;
						},
						() => {
							this.toast.success('Supprimé', 'supprimé');
						});
	}

	modifierPersonne(nom: any, prenom: any, id: any, age: any,departement : Departement) {
		const obj = {
			id,
			nom,
			prenom,
			age,
			departement
		};
		console.log('objet à modifier', obj);
		this.http.put(`${this.api}/update-personne`, obj)
				.subscribe(result => {
							console.log(result);
						},
						error => {
							this.toast.error('Veuillez vérifier les information', 'erreur');
							// this.errors = error;
						},
						() => {
							this.toast.success('Modifié', 'modifier');

						});
	}
}
