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
										@click="editProjeto(item.id)"
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
										@click="confirmDelete(item.id, item.Titulo)"
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
	<!-- Confirmation Dialog for Deletion -->
	<v-dialog v-model="confirmDialog" max-width="500px">
		<v-card>
			<v-card-title class="headline">Confirmar Exclusão</v-card-title>
			<v-card-text>
				Tem certeza que deseja remover o projeto <strong>{{ projetoToDelete.name }}</strong>?
				<br><br>
				<v-alert color="warning" variant="outlined" class="mt-3">
					Esta ação não pode ser desfeita.
				</v-alert>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="grey" @click="confirmDialog = false">Cancelar</v-btn>
				<v-btn color="red" @click="deleteProjeto(projetoToDelete.id); confirmDialog = false">Confirmar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<!-- Edit Dialog -->
	<v-dialog v-model="editDialog" max-width="800px">
		<v-card>
			<v-card-title class="headline">Editar Projeto</v-card-title>
			<v-card-text>
				<v-row>
					<v-col cols="12">
						<span>Título do Projeto</span>
						<v-text-field
							variant="outlined"
							v-model="projetoToEdit.Titulo"
							density="compact"
							required
						></v-text-field>
					</v-col>
					
					<v-col cols="6">
						<span>Data de Início</span>
						<v-row dense>
							<v-col cols="4">
								<v-text-field
									variant="outlined"
									v-model="projetoToEdit.dataInicio.day"
									label="Dia"
									type="number"
									:min="1"
									:max="31"
									density="compact"
								></v-text-field>
							</v-col>
							<v-col cols="4">
								<v-text-field
									variant="outlined"
									v-model="projetoToEdit.dataInicio.month"
									label="Mês"
									type="number"
									:min="1"
									:max="12"
									density="compact"
								></v-text-field>
							</v-col>
							<v-col cols="4">
								<v-text-field
									variant="outlined"
									v-model="projetoToEdit.dataInicio.year"
									label="Ano"
									type="number"
									:min="2000"
									:max="2100"
									density="compact"
								></v-text-field>
							</v-col>
						</v-row>
					</v-col>

					<v-col cols="6">
						<span>Data de Término</span>
						<v-row dense>
							<v-col cols="4">
								<v-text-field
									variant="outlined"
									v-model="projetoToEdit.dataFim.day"
									label="Dia"
									type="number"
									:min="1"
									:max="31"
									density="compact"
								></v-text-field>
							</v-col>
							<v-col cols="4">
								<v-text-field
									variant="outlined"
									v-model="projetoToEdit.dataFim.month"
									label="Mês"
									type="number"
									:min="1"
									:max="12"
									density="compact"
								></v-text-field>
							</v-col>
							<v-col cols="4">
								<v-text-field
									variant="outlined"
									v-model="projetoToEdit.dataFim.year"
									label="Ano"
									type="number"
									:min="2000"
									:max="2100"
									density="compact"
								></v-text-field>
							</v-col>
						</v-row>
					</v-col>

					<v-col cols="12">
						<span>Status do Projeto</span>
						<v-combobox
							v-model="projetoToEdit.status"
							:items="statusOptions"
							variant="outlined"
							density="compact"
						></v-combobox>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="grey" @click="editDialog = false">Cancelar</v-btn>
				<v-btn color="primary" @click="confirmEdit" :loading="editLoading">Confirmar Edição</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>	
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
			confirmDialog: false, // For the delete confirmation dialog
			projetoToDelete: { id: null, name: '' }, // Store user info for deletion confirmation
			editDialog: false, // For the edit dialog
			editLoading: false, // Loading state for edit operations
			projetoToEdit: {
				id: null,
				Titulo: '',
				dataInicio: { day: '', month: '', year: '' },
				dataFim: { day: '', month: '', year: '' },
				status: ''
			},
			statusOptions: ['Em andamento', 'Finalizado', 'Cancelado'],
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
					tempProjetos = tempProjetos.filter((item) => item.status === "Em andamento");
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
        },
		confirmDelete(id, name) {
			this.projetoToDelete = { id, name };
			this.confirmDialog = true;
		},
		async editProjeto(id) {
			this.editLoading = true;
			try {
				// Primeiro, tenta buscar da API
				let projeto = null;
				
				try {
					const response = await projectsControler.getProject(id);
					if (response.status === 200) {
						projeto = response.body;
					}
				} catch (apiError) {
					console.warn('Não foi possível buscar projeto da API, usando dados locais:', apiError);
					// Se falhar, busca dos dados locais
					projeto = this.projetos.find(p => p.id === id);
					if (!projeto) {
						throw new Error('Projeto não encontrado');
					}
					// Converte os dados locais para o formato esperado
					projeto = {
						id: projeto.id,
						titulo: projeto.Titulo,
						dtinicio: projeto.dataInicio,
						dtfim: projeto.dataFim,
						status: projeto.status
					};
				}
				
				if (projeto) {
					this.projetoToEdit.id = projeto.id;
					this.projetoToEdit.Titulo = projeto.titulo || projeto.Titulo;
					
					// Parse data de início
					let dataInicio = projeto.dtinicio || projeto.dataInicio;
					if (dataInicio) {
						// Se a data está no formato ISO (YYYY-MM-DD)
						if (dataInicio.includes('-') && dataInicio.length === 10) {
							const [year, month, day] = dataInicio.split("-");
							this.projetoToEdit.dataInicio = {
								day: day || '',
								month: month || '',
								year: year || ''
							};
						} else {
							// Se a data está em outro formato, tenta converter
							const date = new Date(dataInicio);
							if (!isNaN(date.getTime())) {
								this.projetoToEdit.dataInicio = {
									day: String(date.getDate()).padStart(2, '0'),
									month: String(date.getMonth() + 1).padStart(2, '0'),
									year: String(date.getFullYear())
								};
							} else {
								this.projetoToEdit.dataInicio = { day: '', month: '', year: '' };
							}
						}
					} else {
						this.projetoToEdit.dataInicio = { day: '', month: '', year: '' };
					}
					
					// Parse data de fim
					let dataFim = projeto.dtfim || projeto.dataFim;
					if (dataFim) {
						// Se a data está no formato ISO (YYYY-MM-DD)
						if (dataFim.includes('-') && dataFim.length === 10) {
							const [year, month, day] = dataFim.split("-");
							this.projetoToEdit.dataFim = {
								day: day || '',
								month: month || '',
								year: year || ''
							};
						} else {
							// Se a data está em outro formato, tenta converter
							const date = new Date(dataFim);
							if (!isNaN(date.getTime())) {
								this.projetoToEdit.dataFim = {
									day: String(date.getDate()).padStart(2, '0'),
									month: String(date.getMonth() + 1).padStart(2, '0'),
									year: String(date.getFullYear())
								};
							} else {
								this.projetoToEdit.dataFim = { day: '', month: '', year: '' };
							}
						}
					} else {
						this.projetoToEdit.dataFim = { day: '', month: '', year: '' };
					}
					
					this.projetoToEdit.status = projeto.status || 'Em andamento';
					this.editDialog = true;
				} else {
					throw new Error('Projeto não encontrado');
				}
			} catch (error) {
				statusCode.toastError({
					status: error.response ? error.response.status : 500,
					statusText: error.message || 'Erro ao carregar projeto para edição',
				});
			} finally {
				this.editLoading = false;
			}
		},
		async confirmEdit() {
			this.editLoading = true;
			try {
				const payload = {
					titulo: this.projetoToEdit.Titulo,
					dtinicio: `${this.projetoToEdit.dataInicio.year}-${String(this.projetoToEdit.dataInicio.month).padStart(2, '0')}-${String(this.projetoToEdit.dataInicio.day).padStart(2, '0')}`,
					dtfim: `${this.projetoToEdit.dataFim.year}-${String(this.projetoToEdit.dataFim.month).padStart(2, '0')}-${String(this.projetoToEdit.dataFim.day).padStart(2, '0')}`,
					status: this.projetoToEdit.status
				};

				console.log('Payload para edição:', payload);
				console.log('ID do projeto:', this.projetoToEdit.id);

				const response = await projectsControler.updateProject(this.projetoToEdit.id, payload);

				if (response.status === 200) {
					statusCode.toastSuccess({
						status: response.status,
						statusText: 'Projeto editado com sucesso',
					});
					this.editDialog = false;
					this.loadProjetos(); // Recarregar lista
				} else {
					statusCode.toastError({
						status: response.status,
						statusText: 'Erro ao editar projeto',
					});
				}
			} catch (error) {
				console.error('Erro ao editar projeto:', error);
				
				if (error.message && error.message.includes('CORS')) {
					statusCode.toastError({
						status: 500,
						statusText: 'Erro de CORS: O servidor precisa ser configurado para permitir requisições deste domínio',
					});
				} else if (error.response && error.response.status === 404) {
					statusCode.toastError({
						status: 404,
						statusText: 'Projeto não encontrado. Ele pode ter sido removido por outro usuário.',
					});
				} else if (error.response && error.response.status === 400) {
					statusCode.toastError({
						status: 400,
						statusText: 'Dados inválidos. Verifique se todas as informações estão corretas.',
					});
				} else {
					statusCode.toastError({
						status: error.response ? error.response.status : 500,
						statusText: error.message || 'Erro ao editar projeto',
					});
				}
			} finally {
				this.editLoading = false;
				this.editDialog = false;
			}
		},
		async deleteProjeto(id) {
			try {
				const response = await projectsControler.deleteProject(id).then((response) => {
					return response;
				});
				if (response.status === 200) {
					this.loadProjetos(); // Recarrega a lista de projetos após a exclusão
					this.confirmDialog = false; // Fecha o diálogo de confirmação
					statusCode.toastSuccess({
						status: response.status,
						statusText: 'Projeto excluído com sucesso',
					});
				} else {
					statusCode.toastError({
						status: response.status,
						statusText: 'Erro ao excluir o projeto',
					});
				}
			} catch (error) {
				// Check if it's a CORS error
				if (error.message && error.message.includes('CORS')) {
					statusCode.toastError({
						status: 500,
						statusText: 'Erro de CORS: O servidor precisa ser configurado para permitir requisições deste domínio',
					});
				} else {
					statusCode.toastError({
						status: error.response ? error.response.status : 500,
						statusText: error.message || 'Erro ao excluir o projeto',
					});
				}
				this.confirmDialog = false; // Fecha o diálogo mesmo em caso de erro
			}
		},
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