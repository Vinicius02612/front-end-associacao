<template>
	<v-container class="ma-0 fill-height align-start" max-width="100%">
		<v-row class="mt-0 ml-0 mr-0" :gutter="1">
			<v-col cols="12">
				<div class="d-flex justify-space-between align-center">
					<div class="d-flex" width="50%">
						<v-hover v-slot:default="{ isHovering, props }">
							<v-card width="50%">
								<v-card-title class="d-flex align-center justify-space-between">
									Receita Total
									<v-icon class="text-green">mdi-hand-coin-outline</v-icon>
								</v-card-title>
								<v-card-text>
									<v-btn class="d-flex justify-space-between" variant="flat" width="100%" to="/financas/receitas">
										<h2>R$ 768.39</h2>
										<v-icon size="x-large">mdi-arrow-right</v-icon>
									</v-btn>
								</v-card-text>
							</v-card>
						</v-hover>
						<v-hover v-slot:default="{ isHovering, props }">
							<v-card class="ml-3">
								<v-card-title class="d-flex align-center justify-space-between">
									Despesa Total
									<v-icon class="text-red">mdi-hand-coin-outline</v-icon>
								</v-card-title>
								<v-card-text>
									<v-btn class="d-flex justify-space-between" variant="flat" width="100%" to="/financas/despesas">
										<h2>R$ 457.89</h2>
										<v-icon size="x-large">mdi-arrow-right</v-icon>
									</v-btn>
								</v-card-text>
							</v-card>
						</v-hover>
					</div>
					<div class="d-flex">
						<div class="d-flex">
							<v-text-field
								class=" mr-5 bg-grey-lighten-4"
								append-inner-icon="mdi-magnify"
								label="Busca por nome ou CPF"
								v-model="filters.search"
								width="300"
								variant="outlined"
								density="compact"
								hide-details
								/>
							<v-btn
								class="ma-1 d-flex align-center"
								color="primary"
								variant="outlined"
								@click="filters.selected = false, filterMesnalidades()"
							>
								<v-tooltip
									activator="parent"
									location="bottom"
								>
									Em Dia
								</v-tooltip>
								<v-icon>mdi-checkbox-marked-circle-outline</v-icon>
							</v-btn>
							<v-btn
								class="ma-1 d-flex align-center"
								variant="outlined"
								color="red"
								@click="filters.selected = true, filterMesnalidades()"
							>
								<v-tooltip
									activator="parent"
									location="bottom"
								>
									Atrasada
								</v-tooltip>
								<v-icon>mdi-close</v-icon>
							</v-btn>
							<v-btn
								class="ma-1 d-flex align-center border-lg border-opacity-75"
								variant="outlined"
								@click="filters.selected = 'all', filterMesnalidades()"
							>
								<v-tooltip
									activator="parent"
									location="bottom"
								>
									Todos
								</v-tooltip>
								<v-icon>mdi-list-box-outline</v-icon>
							</v-btn>
						</div>
					</div>
				</div>
			</v-col>

			<v-col cols="12">
				<v-card>
					<v-card-title class="d-flex align-center justify-space-between">
						Mensalidades
						<v-btn append-icon="mdi-plus" color="primary" to="/financas/adicionar" variant="elevated">
							Adicionar Mensalidade
						</v-btn>
					</v-card-title>
					<v-card-text>

						<v-table>
							<thead>
								<tr>
									<th>Titular</th>
									<th>CPF</th>
									<th>Data de Nascimento</th>
									<th>Cargo</th>
									<th>Valor</th>
									<th>Status</th>
									<!-- <th>Ações</th> -->
								</tr>
							</thead>
							<tbody>
								<tr
								v-for="(item, index) in MensalidadesFiltered"
								:key="item.id"
								:style="{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8' }"
								>
								<td>{{ item.Titular }}</td>
								<td>{{ item.CPF }}</td>
								<td><DateLabel :date="new Date(item.DataNascimento)" /> </td>
								<td>{{ item.Cargo }}</td>
								<td>R$ {{ item.valor.toFixed(2) }}</td>
								<td>
									<v-chip
									:color="item.EmAtraso ? 'red' : 'green'"
									class="chip-size d-flex justify-center"
									variant="outlined"
									>
									{{ item.EmAtraso ? 'Atrasada' : 'Em Dia' }}
								</v-chip>
							</td>
							<!-- <td>
								<v-btn-group
									variant="outlined"
									divided
									rounded="lg"
									class="custom-btn-group d-flex align-center"
								>
									<v-btn
										width="32"
										height="32"
										@click="monthlyEdit(item)"
										:loading="editLoading"
									>
										<v-tooltip
											activator="parent"
											location="bottom"
										>
											Editar
										</v-tooltip>
										<v-icon size="x-large">mdi-pencil</v-icon>
									</v-btn>
									<v-btn
										width="32"
										height="32"
									>
										<v-tooltip
											activator="parent"
											location="bottom"
										>
											Apagar
										</v-tooltip>
										<v-icon size="x-large">mdi-trash-can-outline</v-icon>
									</v-btn>
								</v-btn-group>
						</td> -->
					</tr>
				</tbody>
			</v-table>
		</v-card-text>
	</v-card>
			</v-col>
			
		</v-row>
	</v-container>	
</template>

<script>
import DateLabel from '@/components/ui/DateLabel.vue';
import MonthlyController from '@/controllers/monthlyControler';
import UserController from '@/controllers/userController';
import statusCode from '@/helpers/statusCode';
import { ruleRequired } from '@/helpers/RulesHelper';

const monthlyController = new MonthlyController();
const userController = new UserController();

export default {
	name: 'Mensalidades',
	components: {
		DateLabel,
	},
	data() {
		return {
			message: 'Hello, Vue!',
			Mensalidades: [],
			MensalidadesFiltered: null,
			users: [],
			filters: {
				selected: "all",
				search: "",
				},
			ruleRequired,
		};
	},
	async mounted(){
		await this.loadUSers();
		await this.loadMensalidades();
		this.filterMesnalidades();
	},
	methods: {
		greet() {
			alert(this.message);
		},

		async loadUSers() {
			try {
				// Simulate an API call to fetch users
				this.users = await userController.getUsers()
				.then((response) => {
					if (response.status === 200) {

						return response.body;
					} else {
						throw new Error("Failed to load users");
					}
				});
			} catch (error) {
				statusCode.toastError(error);
			}
		},

		async loadMensalidades() {
			try {
				// Simulate an API call to fetch mensalidades
				this.Mensalidades = await monthlyController.getMonthlys()
				.then((response) => {
					if (response.status === 200) {
						const createData = response.body.map((item) => {
							item.User = this.users.find(user => user.id === item.iduser) || {};
							return {
								...item,
								Titular: item.User?.name || "Desconhecido",
								CPF: item.User?.cpf || "N/A",
								DataNascimento: item.User?.data_nascimento || "N/A",
								Cargo: item.User?.cargo || "N/A",
							};
						});
						console.log("Mensalidades", createData);
						return createData;
					} else {
						throw new Error("Failed to load mensalidades");
					}
				});
			} catch (error) {
				statusCode.toastError(error);			}
		},

		filterMesnalidades() {
			switch (this.filters.selected) {
				case "all":
					this.MensalidadesFiltered = this.Mensalidades;
					break;
				case true:
					this.MensalidadesFiltered = this.Mensalidades.filter((item) => item.EmAtraso);
					break;
				case false:
					this.MensalidadesFiltered = this.Mensalidades.filter((item) => !item.EmAtraso);
					break;
				case "search":
					this.MensalidadesFiltered = this.Mensalidades.filter((item) => 
						item?.Titular?.toLowerCase().includes(this.filters.search.toLowerCase()) ||
						item?.CPF?.includes(this.filters.search)

					);
					break;
			}
		},
	},
	watch: {
		"filters.search"() {
			this.filters.selected = "search";
			this.filterMesnalidades();
		}
	},
};
</script>

<style scoped>

</style>