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
										<h2>R$ {{totalReceitas}}</h2>
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
				</div>
			</v-col>

			<v-col cols="12">
				<v-card>
					<v-card-title class="d-flex align-center justify-space-between">
						Receitas
						<v-btn append-icon="mdi-plus" color="primary" to="financas/receitas/adicionar" variant="elevated">
							Adicionar Receita
						</v-btn>
					</v-card-title>
					<v-card-text>

						<v-table>
							<thead>
								<tr>
									<th>Origem</th>
									<th>Data</th>
									<th>valor</th>
									<th>Ações</th>
								</tr>
							</thead>
							<tbody>
								<tr
								v-for="(item, index) in ReceitasFiltered"
								:key="item.id"
								:style="{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8' }"
								>
								<td>{{ item.Origem }}</td>
								<td><DateLabel :date="new Date(item.Data)" /> </td>
								<td>R$ {{ item.Valor.toFixed(2) }}</td>
							<td>
								<v-btn-group
									variant="outlined"
									divided
									rounded="lg"
									class="custom-btn-group d-flex align-center"
								>
									<v-btn
										width="32"
										height="32"
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
						</td>
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

export default {
	name: 'receitas',
	components: {
		DateLabel,
	},
	data() {
		return {
			message: 'Hello, Vue!',
			Receitas: [],
			ReceitasFiltered: null,
			filters: {
				selected: "all",
				},
		};
	},
	mounted(){
		this.filterReceitas();
	},
	methods: {
		greet() {
			alert(this.message);
		},
		async loadReceitas() {
			try {
				const response = await this.$axios.get('/receitas');
				if (response.status === 200) {
					this.Receitas = response.data.map(item => ({
						id: item.id,
						Origem: item.origem,
						Data: item.data,
						Valor: item.valor,
					}));
					this.filterReceitas();
				} else {
					console.error('Erro ao carregar receitas:', response.statusText);
				}
			} catch (error) {
				console.error('Erro ao carregar receitas:', error);
			}
		},
		filterReceitas() {
			switch (this.filters.selected) {
				case "all":
					this.ReceitasFiltered = this.Receitas;
					break;
			}
		},
	},
	computed: {
		totalReceitas() {
			return this.Receitas.reduce((total, receita) => total + receita.Valor, 0).toFixed(2);
		},
	},
};

</script>

<style scoped>

</style>