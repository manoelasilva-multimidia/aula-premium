class BlocoEnquete extends HTMLElement {
	get $item() {
		return JSON.parse(_.unescape(this.getAttribute("item"))) || "";
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.render();
	}

	render() {
		// this._data = JSON.parse(this.getAttribute("item"));
		this._data = this.$item;

		const enqueteTitulo = /*html*/ `
			<p style="margin-bottom: 1rem">
				<% if(data.refazer == 'false') { %>
					<button class="btn-responder-uma-vez" title="Esta enquete só poderá ser respondida uma única vez.">⚠️</button>
				<% } %>
				<span><%= data.titulo %></span>
			</p>
		`;

		const destaqueHeader = /*html*/ `
			<div id="enquete-<%= data.id %>" class="destaque-enquete" part="bg">
				<p class="label-enquete" part="bg">Enquete: </p>
				<div class="container-enquete" part="bg">
		`;
		const destaqueFim = /*html*/ `</div></div>`;

		const enqueteImgIcones = /*html*/ `
			<div class="is-flex secao-icones">
				<% _.each(data.itens, function (cada) { %> 
					<label class="label-inline" for="item-<%= data.id %>-<%- cada.id %>" part="label">
						<img src="<%- data.path %>/<%- cada.imagem %>" style="height: 32px" onerror="this.style.display='none'; this.parentNode.style['background-color'] = '#efefef'" />
						<span class="texto aria-hidden="true"><%= cada.nome %></span>
						<% if(Number(data['max-inputs']) == 1) { %>
						<input class="is-sr-only" type="radio" id="item-<%= data.id %>-<%- cada.id %>" name="opt" value="<%= cada.id %>" />
						<% } else { %>
						<input class="is-sr-only" type="checkbox" id="item-<%= data.id %>-<%- cada.id %>" value="<%= cada.id %>" />
						<% } %>
					</label>
				<% })%>
			</div>
		`;

		const enqueteImg = /*html*/ `
			<div class="imagem secao-imagens">
				<% _.each(data.itens, function (cada, index) { %> 
				<label for="item-<%= data.id %>-<%- cada.id %>" part="label">
					<span class="is-sr-only"><%- index + 1%> - <%- cada.nome %></span>
					<% if(Number(data['max-inputs']) == 1) { %>
					<input class="is-sr-only" type="radio" id="item-<%= data.id %>-<%- cada.id %>" name="opt" value="<%= cada.id %>" />
					<% } else { %>
					<input class="is-sr-only" type="checkbox" id="item-<%= data.id %>-<%- cada.id %>" value="<%= cada.id %>" />
					<% } %>
					<img src="<%- data.path %>/<%- cada.imagem %>" onerror="this.style.display='none'; this.parentNode.style['background-color'] = '#efefef'" />
				</label>
			<% })%>
		</div>
		`;

		const enqueteCheck = /*html*/ `
			<div class="check secao-check">
			<% _.each(data.itens, function (cada) { %> 
				<div>
					<label class="label" for="item-<%= data.id %>-<%- cada.id %>" part="label">
						<span class="texto" aria-hidden="true"><%= cada.nome %></span>
						<% if(Number(data['max-inputs']) == 1) { %>
						<input part="check1" class="is-sr-only" type="radio" id="item-<%= data.id %>-<%- cada.id %>" name="opt" value="<%= cada.id %>" />
						<% } else { %>
						<input part="check1" class="is-sr-only" type="checkbox" id="item-<%= data.id %>-<%- cada.id %>" value="<%= cada.id %>" />
						<% } %>
						<span class="check" part="spancheck"></span>
					</label>
				</div>
			<% })%>
			</div>
		`;

		const hasImagens = this._data.itens.some(
			(item) => typeof item.imagem === "string"
		);

		const htmlTipo =
			hasImagens == true
				? this._data.imagens == "padrao"
					? enqueteImg
					: enqueteImgIcones
				: enqueteCheck;

		const html =
			this._data.destaque == "true"
				? destaqueHeader + enqueteTitulo + htmlTipo + destaqueFim
				: enqueteTitulo + htmlTipo;

		const css = /*html*/ `
		<style>
			.btn-responder-uma-vez {
				border: 0;
				background-color: transparent;
				cursor: pointer;
				border-radius: 5px;
				transform: scale(1.8);
			}
			.btn-responder-uma-vez:hover {
				background-color: #efefef;
			}
			.destaque-enquete {
				background-color: #e8eaee;
				border-radius: 10px;
				padding: 8px;
			}
			.label-enquete {
				font-weight: 700;
				font-size: 1.2rem;
				margin-top: 0;
				margin-bottom: 10px;
				text-align: center;
				color: var(--main-dark-bg-color);
			}

			.container-enquete {
				background-color: white;
				padding: 12px;
				border-radius: 5px
			}

			.secao-icones {
				display: flex;
				flex-wrap: wrap
			}

			.secao-icones .label-inline {
				display: inline-flex;
				align-items: center;
				padding: 0.4rem .8rem;
				border: 2px solid #e2e2e2;
				margin-bottom: 0.5rem;
				margin-right: 0.5rem;
				border-radius: 5px;
				cursor: pointer;
				transition: 0.1s
			}
			.secao-icones .label-inline.selecionado {
				background-color: rgb(240, 244, 250);
				border: 2px solid #83d0f2;
			}
			.secao-icones .label-inline .texto {
				margin-left: 0.5rem;
			}

			.secao-check .label {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: row-reverse;
				border: 2px solid transparent;
				padding: 3px 3px 3px 0;
			}

			label .texto {
				flex: 1;
			}

			.secao-check input+.check {
				width: 50px !important;
				height: 50px !important;
				min-width: 50px;
				background-image: url('assets/imagens/ticar0-padrao.svg');
				background-repeat: no-repeat;
				background-position: top center;
				background-repeat: no-repeat !important;
				border-style: solid;
				border-radius: 3px;
				border-width: 2px;
				border-color: transparent;
				margin-right: 5px
			}

			.secao-check input:checked+.check {
				background-image: url('assets/imagens/ticar1-padrao.svg')
			}

			label {
				cursor: pointer;
				margin-bottom: 5px;
				border-radius: 5px;
			}

			.is-sr-only {
				clip: rect(0,0,0,0) !important;
				border: none !important;
				height: .01em !important;
				overflow: hidden !important;
				padding: 0 !important;
				position: absolute !important;
				white-space: nowrap !important;
				width: .01em !important;
			}

			.secao-imagens {
				display: flex;
				flex-wrap: wrap;
			}
			.secao-imagens > * {
				/* margin-right: 10px; */
				margin-bottom: 10px
			}
			@media(max-width: 500px) {
				.secao-imagens label {
					width: calc(50% - 30px);
				}
				.secao-imagens label:nth-child(odd) {
					margin-right: 10px
				}
			}
			@media(min-width: 501px) and (max-width: 700px) {
				.secao-imagens label {
					width: calc(30% - 20px)
				}
				.secao-imagens label:not(:nth-child(3n+3)) {
					margin-right: 12px
				}
			}
			@media(min-width: 701px) and (max-width: 900px) {
				.secao-imagens label {
					width: 19%
				}
				.secao-imagens label:not(:nth-child(4n+4)) {
					margin-right: 12px
				}
			}
			@media(min-width: 901px) {
				.secao-imagens label {
					min-width: 150px;
					min-height: 150px;
					max-width: 220px;
					margin-right: 15px
				}
			}
			.secao-imagens img {
				max-height: 180px;
				width: 100%
			}

			.secao-imagens label {
				border-width: 2px;
				border-style: solid;
				padding: 10px;
				border-color: #efefef;
				display: flex;
				align-items: center;
				transition: .08s;
			}
			.secao-imagens label:hover,
			.secao-icones label:hover {
				transform: scale(1.08)
			}


			/* rever depois, organizar classes para nao precisar do important */
			.active,
			.secao-check label.active,
			.secao-imagens label.active,
			.secao-icones .label-inline.active {
				background-color: rgb(240, 244, 250);
				border: 2px solid #83d0f2;
			}

			
		</style>`;
		const elHTML = css + html;

		const tpl = _.template(elHTML);
		const si = tpl({ data: this._data });

		const root = document.createElement("div");
		root.innerHTML = si;
		this.shadowRoot.appendChild(root);
	}

	/**
	 * Elemento adicionado ao DOM
	 */
	connectedCallback() {
		var root = this;
		var inputs = this.shadowRoot.querySelectorAll("input[type]");
		var tipo = inputs[0].getAttribute("type") == "radio" ? "radio" : "checkbox";


		// Aplicar respostas ja salvas
		// Nao foi possivel usar o :has do css para facilitar
		// pois nao ha suporte do navegador firefox
		const resps = app.enquete.results();
		if (_.isObject(resps) && _.isArray(resps[this._data.id])) {
			var respondidoAtual = resps[this._data.id];
			respondidoAtual.map(resp => {
				return this.shadowRoot.querySelector('#item-' + this._data.id + '-' + resp);
			}).forEach(cada => {
				cada.parentNode.classList.add('active');
				cada.parentNode.setAttribute('part', 'labelactive');
				cada.checked = true;
			});
		}

		// Registra eventos
		_.each(inputs, function (elem) {
			if (tipo == "radio") {
				elem.addEventListener("change", function (ev) {
					if (app.urlParams['data-somentevisualizacao'] == 'true') {
						return
					}
					root.shadowRoot.querySelectorAll('.active').forEach(function(elActive) {
						elActive.classList.remove('active');
						elActive.removeAttribute('part');
					});
					ev.target.parentNode.classList.add('active');
					ev.target.parentNode.setAttribute('part', 'labelactive');
					
					app.enquete.setResp(root._data.id, [ev.target.value]);
				});
			} else {
				elem.addEventListener("change", function (ev) {
					if (app.urlParams['data-somentevisualizacao'] == 'true') {
						return
					}
					const max = Number(root._data["max-inputs"]);
					const checkeds = root.shadowRoot.querySelectorAll("input:checked");
					if (checkeds.length > max) {
						Swal.fire(
							"Atenção!",
							"Limite de " + max + " alternativas selecionadas atingido."
						);
						ev.target.checked = false;
						return;
					}

					if (ev.target.checked == true) {
						ev.target.parentNode.classList.add('active');
						ev.target.parentNode.setAttribute('part', 'labelactive');
					}
					else {
						ev.target.parentNode.classList.remove('active');
						ev.target.parentNode.removeAttribute('part');
					}

					var final = [];
					checkeds.forEach(function (inputCheck) {
						final.push(inputCheck.value);
					});
					app.enquete.setResp(root._data.id, final);
				});
			}
		});

		_.each(root.shadowRoot.querySelectorAll(".btn-responder-uma-vez"), function(el) {
			el.addEventListener('click', function(ev) {
				Swal.fire('Atenção!', 'Esta enquete só poderá ser respondida uma única vez.');
			})
		});
	}
}
customElements.define("bloco-enquete", BlocoEnquete);
