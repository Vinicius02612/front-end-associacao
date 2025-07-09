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
									<th>Ações</th>
								</tr>
							</thead>
							<tbody>
								<tr
								v-for="(item, index) in MensalidadesFiltered"
								:key="item.cpf"
								:style="{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8' }"
								>
								<td>{{ item.Titular }}</td>
								<td>{{ item.CPF }}</td>
								<td><DateLabel :date="new Date(item.DataNascimento)" /> </td>
								<td>{{ item.Cargo }}</td>
								<td>R$ {{ item.Valor.toFixed(2) }}</td>
								<td>
									<v-chip
									:color="item.EmAtraso ? 'red' : 'green'"
									class="chip-size d-flex justify-center"
									variant="outlined"
									>
									{{ item.EmAtraso ? 'Atrasada' : 'Em Dia' }}
								</v-chip>
							</td>
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
	name: 'Mensalidades',
	components: {
		DateLabel,
	},
	data() {
		return {
			message: 'Hello, Vue!',
			Mensalidades: [
											{
												Titular: "Ana Souza",
												CPF: "123.456.789-00",
												DataNascimento: "1985-03-12",
												Cargo: "Presidente",
												Valor: 150.75,
												EmAtraso: false
											},
											{
												Titular: "Carlos Lima",
												CPF: "234.567.890-11",
												DataNascimento: "1979-11-28",
												Cargo: "Secretario",
												Valor: 200.00,
												EmAtraso: false
											},
											{
												Titular: "Juliana Ferreira",
												CPF: "345.678.901-22",
												DataNascimento: "1992-07-06",
												Cargo: "Tesoureiro",
												Valor: 120.5,
												EmAtraso: false
											},
											{
												Titular: "Marcos Dias",
												CPF: "456.789.012-33",
												DataNascimento: "1988-01-19",
												Cargo: "Presidente",
												Valor: 95.0,
												EmAtraso: false
											},
											{
												Titular: "Patrícia Almeida",
												CPF: "567.890.123-44",
												DataNascimento: "1990-05-23",
												Cargo: "Secretario",
												Valor: 175.25,
												EmAtraso: false
											},
											{
												Titular: "João Pedro",
												CPF: "678.901.234-55",
												DataNascimento: "1982-08-02",
												Cargo: "Tesoureiro",
												Valor: 300.0,
												EmAtraso: false
											},
											{
												Titular: "Bianca Ribeiro",
												CPF: "789.012.345-66",
												DataNascimento: "1995-09-10",
												Cargo: "Presidente",
												Valor: 130.6,
												EmAtraso: false
											},
											{
												Titular: "Fernando Nunes",
												CPF: "890.123.456-77",
												DataNascimento: "1975-12-14",
												Cargo: "Secretario",
												Valor: 110.0,
												EmAtraso: true
											},
											{
												Titular: "Camila Rocha",
												CPF: "901.234.567-88",
												DataNascimento: "1983-10-22",
												Cargo: "Tesoureiro",
												Valor: 140.9,
												EmAtraso: false
											},
											{
												Titular: "Diego Martins",
												CPF: "012.345.678-99",
												DataNascimento: "1991-06-17",
												Cargo: "Presidente",
												Valor: 160.0,
												EmAtraso: false
											},
											{
												Titular: "Sabrina Lopes",
												CPF: "321.654.987-00",
												DataNascimento: "1994-04-04",
												Cargo: "Secretario",
												Valor: 210.0,
												EmAtraso: true
											},
											{
												Titular: "Lucas Silva",
												CPF: "432.765.098-11",
												DataNascimento: "1987-03-03",
												Cargo: "Tesoureiro",
												Valor: 100.0,
												EmAtraso: false
											},
											{
												Titular: "Tatiane Moura",
												CPF: "543.876.109-22",
												DataNascimento: "1993-07-30",
												Cargo: "Presidente",
												Valor: 180.35,
												EmAtraso: false
											},
											{
												Titular: "Eduardo Pinto",
												CPF: "654.987.210-33",
												DataNascimento: "1980-01-11",
												Cargo: "Secretario",
												Valor: 99.9,
												EmAtraso: false
											},
											{
												Titular: "Renata Gomes",
												CPF: "765.098.321-44",
												DataNascimento: "1986-12-25",
												Cargo: "Tesoureiro",
												Valor: 250.0,
												EmAtraso: false
											},
											{
												Titular: "Marcelo Cunha",
												CPF: "876.109.432-55",
												DataNascimento: "1977-09-09",
												Cargo: "Presidente",
												Valor: 170.45,
												EmAtraso: false
											},
											{
												Titular: "Aline Barbosa",
												CPF: "987.210.543-66",
												DataNascimento: "1996-10-01",
												Cargo: "Secretario",
												Valor: 135.7,
												EmAtraso: false
											},
											{
												Titular: "Rodrigo Castro",
												CPF: "098.321.654-77",
												DataNascimento: "1990-06-06",
												Cargo: "Tesoureiro",
												Valor: 88.8,
												EmAtraso: false
											},
											{
												Titular: "Simone Teixeira",
												CPF: "109.432.765-88",
												DataNascimento: "1984-02-18",
												Cargo: "Presidente",
												Valor: 300.0,
												EmAtraso: false
											},
											{
												Titular: "Tiago Braga",
												CPF: "210.543.876-99",
												DataNascimento: "1989-05-12",
												Cargo: "Secretario",
												Valor: 145.5,
												EmAtraso: false
											},
											{
												Titular: "Verônica Farias",
												CPF: "321.654.987-01",
												DataNascimento: "1978-03-27",
												Cargo: "Tesoureiro",
												Valor: 275.0,
												EmAtraso: false
											},
											{
												Titular: "Gustavo Moreira",
												CPF: "432.765.098-12",
												DataNascimento: "1997-11-03",
												Cargo: "Presidente",
												Valor: 125.0,
												EmAtraso: false
											},
											{
												Titular: "Helena Pires",
												CPF: "543.876.109-23",
												DataNascimento: "1981-08-19",
												Cargo: "Secretario",
												Valor: 90.0,
												EmAtraso: true
											},
											{
												Titular: "Igor Fernandes",
												CPF: "654.987.210-34",
												DataNascimento: "1992-12-12",
												Cargo: "Tesoureiro",
												Valor: 100.0,
												EmAtraso: false
											},
											{
												Titular: "Larissa Carvalho",
												CPF: "765.098.321-45",
												DataNascimento: "1985-07-14",
												Cargo: "Presidente",
												Valor: 195.0,
												EmAtraso: true
											}
										],
			MensalidadesFiltered: null,
			filters: {
				selected: "all",
				search: "",
				},
		};
	},
	mounted(){
		this.filterMesnalidades();
	},
	methods: {
		greet() {
			alert(this.message);
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