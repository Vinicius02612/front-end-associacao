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
										<h2>R$ {{totalDespesas}}</h2>
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
						Despesas
						<v-btn append-icon="mdi-plus" color="primary" to="/financas/adicionar" variant="elevated">
							Adicionar Despesa
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
								v-for="(item, index) in DespesasFiltered"
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
			Despesas: [
									{ id: 1, Origem: "Gasto com material de limpesa", Data: "2025-05-01", Valor: 45.50 },
									{ id: 3, Origem: "Gasto com material de limpesa", Data: "2025-05-03", Valor: 32.75 },
									{ id: 5, Origem: "Gasto com material de limpesa", Data: "2025-05-05", Valor: 68.90 },
									{ id: 7, Origem: "Gasto com material de limpesa", Data: "2025-05-07", Valor: 40.00 },
									{ id: 9, Origem: "Gasto com material de limpesa", Data: "2025-05-09", Valor: 35.20 },
									{ id: 11, Origem: "Gasto com material de limpesa", Data: "2025-05-11", Valor: 55.00 },
									{ id: 13, Origem: "Gasto com material de limpesa", Data: "2025-05-13", Valor: 65.99 },
									{ id: 15, Origem: "Gasto com material de limpesa", Data: "2025-05-15", Valor: 47.30 },
									{ id: 17, Origem: "Gasto com material de limpesa", Data: "2025-05-17", Valor: 28.45 },
									{ id: 19, Origem: "Gasto com material de limpesa", Data: "2025-05-19", Valor: 38.80 },
								],
			DespesasFiltered: null,
			filters: {
				selected: "all",
				},
		};
	},
	mounted(){
		this.filterDespesas();
	},
	methods: {
		greet() {
			alert(this.message);
		},
		filterDespesas() {
			switch (this.filters.selected) {
				case "all":
					this.DespesasFiltered = this.Despesas;
					break;
			}
		},
	},
	computed: {
		totalDespesas() {
			return this.Despesas.reduce((total, despesa) => total + despesa.Valor, 0).toFixed(2);
		},
	},
};

</script>

<style scoped>

</style>