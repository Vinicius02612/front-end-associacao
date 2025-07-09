<template>
	<v-container class="ma-0 fill-height align-start" max-width="100%">
		<v-row class="mt-0 ml-0 mr-0" :gutter="1">
			<v-col cols="12">
				<div class="d-flex justify-space-between align-center mt-2">
					<div class ="d-flex" style="width: 30%">
						<v-text-field
						class=" mr-5 bg-grey-lighten-4"
						append-inner-icon="mdi-magnify"
						label="Busca por Título ou CNPJ"
						v-model="filters.search"
						max-width="70%"
						variant="outlined"
						density="compact"
						hide-details
						/>
						<v-btn append-icon="mdi-plus" color="primary" to="/projetos/adicionar" variant="elevated">
							Novo projeto
						</v-btn>
					</div>
					<div class="d-flex align-center">
						<span>Filtros: </span>
						<v-btn
							class="ma-1 d-flex align-center"
							color="primary"
							variant="outlined"
							@click="filters.selected = 'andamento', filterProjetos()"
						>
							<v-tooltip
								activator="parent"
								location="bottom"
							>
								Em andamento
							</v-tooltip>
							<v-icon>mdi-play-speed</v-icon>
						</v-btn>
						<v-btn
							class="ma-1 d-flex align-center"
							color="gray"
							variant="outlined"
							@click="filters.selected = 'complete', filterProjetos()"
						>
							<v-tooltip
								activator="parent"
								location="bottom"
							>
								Completos
							</v-tooltip>
							<v-icon>mdi-checkbox-marked-circle-outline</v-icon>
						</v-btn>
						<v-btn
							class="ma-1 d-flex align-center"
							variant="outlined"
							color="red"
							@click="filters.selected = 'canceled', filterProjetos()"
						>
							<v-tooltip
								activator="parent"
								location="bottom"
							>
								Cancelados
							</v-tooltip>
							<v-icon>mdi-close</v-icon>
						</v-btn>
						<v-btn
							class="ma-1 d-flex align-center border-lg border-opacity-75"
							variant="outlined"
							@click="filters.selected = 'all', filterProjetos()"
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
			</v-col>

			<v-col cols="12">
				<v-table>
							<thead>
								<tr>
									<th>Titulo</th>
									<th>Data de Inicio</th>
									<th>Data de Término</th>
									<th>Status</th>
									<th>Ações</th>
								</tr>
							</thead>
							<tbody>
								<tr
								v-for="(item, index) in projetosFiltered"
								:key="item.id"
								:style="{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8' }"
								>
								<td>{{ item.Titulo }}</td>

								<td>{{ formatDate(item.dataInicio) }}</td>
            					<td>{{ formatDate(item.dataFim) }}</td>
								
								<td>
									<v-chip
									:color="item.status === 'Finalizado' ? 'gray' : item.status === 'Cancelado' ? 'red' : 'green'"
									class="chip-size d-flex justify-center"
									variant="outlined"
									>
									{{ item.status }}
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
			</v-col>
			
		</v-row>
	</v-container>	
</template>

<script>
import DateLabel from '@/components/ui/DateLabel.vue';
import ProjectsController from '@/controllers/projectsControler';
import statusCode from '@/helpers/statusCode';

const projectsControler = new ProjectsController();
export default {
	name: 'projetos',
	components: {
		DateLabel,
	},
	data() {
		return {
			message: 'Hello, Vue!',
			projetos: [ ],
			projetosFiltered: null,
			filters: {
				selected: "all",
				search: "",
				},
		};
	},
	async mounted(){
		await this.loadProjetos();
		this.filterProjetos();
	},
	methods: {
		async loadProjetos() {
			try {
				const response = await projectsControler.getProjects().then((response) => {
						return response;
				});

				console.log(response);

				// Um status 200 é o esperado para requisições GET bem-sucedidas
		
				if (response.status === 200) {
					
					this.projetos = response.body.map((item) => ({

						id: item.id,
						Titulo: item.titulo,
						//converter data_inicio e data_fim para o formato valido dia mes e ano
						
						dataInicio: item.dtinicio,
						dataFim: item.dtfim,
						status: "Em andamento", // Assumindo que o status vem como string ('Em Andamento', 'Cancelado', 'Finalizado')
					}));
				} else {
					// Para outros status 2xx que não 200, ou casos específicos
					console.warn('Resposta da API com status inesperado:', response.status, response.statusText);
					alert('Houve um problema ao carregar os projetos. Tente novamente.');
				}
			} catch (error) {
				// Captura erros de rede, erros HTTP (4xx, 5xx)
				statusCode.toastError({
					status: error.response ? error.response.status : 500,
					statusText: error.message || 'Erro ao carregar projetos',
				});

				// Opcional: Se for um erro 401/403 (Unauthorized/Forbidden), redirecionar para o login
				if (error.response && (error.response.status === 401 || error.response.status === 403)) {
					// Lógica para deslogar e redirecionar
					// this.$router.push('/login');
				}
			}
		},
		filterProjetos() {
			let tempProjetos = [...this.projetos]; // Começa com uma cópia dos projetos originais

			// Aplica o filtro de busca primeiro, se houver
			if (this.filters.search) {
				const searchTerm = this.filters.search.toLowerCase();
				tempProjetos = tempProjetos.filter((item) =>
					item?.Titulo?.toLowerCase().includes(searchTerm) ||
					item?.CNPJ?.includes(searchTerm) // CNPJ geralmente não é sensível a maiúsculas/minúsculas, mas a busca sim
				);
			}

			// Aplica o filtro de status sobre os resultados da busca (ou sobre todos os projetos se não houver busca)
			switch (this.filters.selected) {
				case "andamento":
					tempProjetos = tempProjetos.filter((item) => item.status === "Em Andamento");
					break;
				case "canceled":
					tempProjetos = tempProjetos.filter((item) => item.status === "Cancelado");
					break;
				case "complete":
					tempProjetos = tempProjetos.filter((item) => item.status === "Finalizado");
					break;
				// Para "all" ou "search" (já tratado acima), não fazemos um filtro adicional aqui.
				// O caso "search" só serve para indicar que o filtro de busca está ativo,
				// a filtragem real já aconteceu no 'if (this.filters.search)'.
			}

			this.projetosFiltered = tempProjetos;
			console.log("Projetos Filtrados:", this.projetosFiltered);
		},
		formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            // Verifica se a data é válida
            if (isNaN(date.getTime())) {
                return 'Data Inválida'; // Ou algum placeholder de erro
            }
            // Formate a data como desejar, por exemplo: DD/MM/AAAA
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é 0-indexed
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
	},
	watch: {
		"filters.search"() {
			console.log(this.filters.search);
			this.filters.selected = "search";
			this.filterProjetos();
		}
	},
};
</script>

<style scoped>

</style>