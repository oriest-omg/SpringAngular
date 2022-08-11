import { Component } from '@angular/core';
import { ConfirmationService, FilterService, MenuItem, PrimeNGConfig } from 'primeng/api';
import { Personne } from 'src/app/model/personne.model';
import { PersonneServiceService } from 'src/app/service/personne-service.service';
import { NgForm } from '@angular/forms';
import { Departement } from 'src/app/model/departement.mode';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [ConfirmationService]
})
export class AppComponent {
	title = 'frontend';
	items: MenuItem[] = [];
	personnes: Personne[] = [];
	personne: Personne = {};
	nom: any = '';
	prenom: any = '';
	age: any = '';
	id: any = '';
	departements: Departement[] = [];
	filteredDepartement: any[] = [];
	selectedDepartement: any;
	departement: Departement = {};

	constructor(
			private filterService: FilterService,
			private personneServiceService: PersonneServiceService,
			private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) {
	}

	ngOnInit() {
		this.primengConfig.ripple = true;
		this.items = [
			{
				label: 'Accueil',
				icon: 'pi pi-fw pi-home',
			},
			{
				label: 'personnes',
				icon: 'pi pi-fw pi-users'
			}
		];
		this.chargerDonne();
	}

	async chargerDonne() {
		await this.personneServiceService.getPersonnes().subscribe((data: any) => {
			this.personnes = [];
			this.personnes = data;
			console.log(this.personnes);
		});

		this.personneServiceService.getDepartements().subscribe((departements: any) => {
			this.departements = departements;
			console.log(this.departements);
		});

	}
	getDepartement(designation : string){
		this.personneServiceService.getDepartement(designation).subscribe((departement: any) => {
			this.departement = departement;
			console.log('departement renseigné',departement);
		});
	}

	displayModal: boolean = false;


	position: string = 'center';


	async showModalDialog(id?: any) {
		this.displayModal = true;
		console.log(id);
		if (id !== undefined) {
			this.id = id;
			await this.personneServiceService.getPersonne(id).subscribe((data: any) => {
				this.personne = data;
				this.nom = this.personne.nom;
				this.prenom = this.personne.prenom;
				this.age = this.personne.age;
			});
		} else if (id == undefined) {
			this.id = '';
			this.nom = '';
			this.prenom = '';
			this.age = '';
		}


	}

	filterDepartement(event: any) {
		//in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
		let filtered: any[] = [];
		let query = event.query;
		for (let i = 0; i < this.departements.length; i++) {
			let departement = this.departements[i];
			if (departement.designation.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				console.log();
				filtered.push(departement);
			}
		}
		this.filteredDepartement = filtered;
	}

	//ajouter personne
	async onSubmit(form: NgForm) {
		console.log(this.id);
		if (this.id == '') {
			console.log('ajouter');
			const id1 = this.personnes.length + 1;
			const id2 = id1.toString();
			console.log(id2);
			const nom = form.value['nom'];
			const prenom = form.value['prenom'];
			const age = form.value['age'];
			const departement = form.value['departement'];
			await this.personneServiceService.addPersonne(id2, nom, prenom, age,departement);
			// if(){
			//   this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
			//   }else{
			//   this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
			// }
			this.nom = '';
			this.prenom = '';
			this.age = '';
			this.id = '';
			await this.chargerDonne();
		} else {
			console.log('modifier');
			console.log(form.value);
			const nom = form.value['nom'];
			const prenom = form.value['prenom'];
			const age = form.value['age'];
			const id = this.id;
			const departement = form.value['departement'];

			this.personneServiceService.modifierPersonne(nom, prenom, id, age,departement);
			this.id = '';
			await this.chargerDonne();
		}

	}

	//supprimer personne
	supprimer(obj?: Personne) {
		console.log(obj);
		if (obj != undefined) {
			this.personneServiceService.deleteTelPersonne(obj.id);
		}
	}
}
