// src/app/pages/atividades/atividades.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AtividadesService } from '../../services/atividades.service';

type TipoChave =
  | 'education'
  | 'recreational'
  | 'social'
  | 'charity'
  | 'cooking'
  | 'relaxation'
  | 'busywork'
  | 'music';

interface CategoriaInfo {
  nome: string;
  icone: string;
  descricao: string;
  citacao: string;
}

@Component({
  selector: 'app-atividades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './atividades.html',
  styleUrls: ['./atividades.css'],
})
export class AtividadesComponent {
  tipo: TipoChave | '' = '';
  participantes: number | '' = '';

  atividade: any | null = null;
  carregando = false;
  erro = false;

  categorias: TipoChave[] = [
    'education', 'recreational', 'social', 'charity', 
    'cooking', 'relaxation', 'busywork', 'music'
  ];

  constructor(private service: AtividadesService) {}

  // Informações detalhadas sobre cada categoria
  private readonly infoCategorias: Record<TipoChave, CategoriaInfo> = {
    education: {
      nome: 'Educação',
      icone: 'fas fa-graduation-cap',
      descricao: 'Aprenda algo novo e expanda seus conhecimentos',
      citacao: '"Às vezes, eu começo uma frase e não sei onde vou chegar. Assim como um político, mas eu termino com mais pontos."'
    },
    recreational: {
      nome: 'Recreação',
      icone: 'fas fa-gamepad',
      descricao: 'Diversão e jogos para relaxar e se divertir',
      citacao: '"Eu não sou supersticioso, mas sou um pouco sticioso."'
    },
    social: {
      nome: 'Social',
      icone: 'fas fa-users',
      descricao: 'Atividades para fazer com amigos ou conhecer novas pessoas',
      citacao: '"Eu sou amigo de todo mundo neste escritório. Somos todos melhores amigos."'
    },
    charity: {
      nome: 'Caridade',
      icone: 'fas fa-hand-holding-heart',
      descricao: 'Ações que beneficiam outras pessoas e a comunidade',
      citacao: '"A melhor maneira de se livrar da dor é dar um presente para alguém."'
    },
    cooking: {
      nome: 'Culinária',
      icone: 'fas fa-utensils',
      descricao: 'Receitas e experiências gastronômicas deliciosas',
      citacao: '"Meu molho é o melhor do mundo. Minha avó me passou a receita."'
    },
    relaxation: {
      nome: 'Relaxamento',
      icone: 'fas fa-spa',
      descricao: 'Atividades para acalmar a mente e reduzir o estresse',
      citacao: '"Estresse é basicamente uma falta de compreensão da forma como as coisas funcionam."'
    },
    busywork: {
      nome: 'Faça Você Mesmo',
      icone: 'fas fa-tools',
      descricao: 'Projetos manuais e atividades práticas',
      citacao: '"Por que usar muitas palavras quando poucas palavras funcionam?"'
    },
    music: {
      nome: 'Música',
      icone: 'fas fa-music',
      descricao: 'Atividades musicais para todos os gostos',
      citacao: '"Eu canto no chuveiro. Às vezes passo tanto tempo cantando que esqueço de me lavar."'
    }
  };

  // Imagens locais para cada categoria
  private readonly imagens: Record<TipoChave, string> = {
    education: 'assets/atividades/education.jpg',
    recreational: 'assets/atividades/recreational.jpg',
    social: 'assets/atividades/social.avif',
    charity: 'assets/atividades/charity.jpg',
    cooking: 'assets/atividades/cooking.jpg',
    relaxation: 'assets/atividades/relaxation.jpg',
    busywork: 'assets/atividades/busywork.jpg',
    music: 'assets/atividades/music.jpg'
  };

  // Imagens de fallback caso as locais não carreguem
  private readonly imagensFallback: Record<TipoChave, string> = {
    education: 'https://cdn.wallpapersafari.com/0/13/elsBJw.jpg',
    recreational: 'https://en.idei.club/uploads/posts/2023-06/thumbs/1687178027_en-idei-club-p-michael-scott-dizain-pinterest-53.jpg',
    social: 'https://akns-images.eonline.com/eol_images/Entire_Site/2019714/rs_1024x514-190814120225-cpr-scott.png?fit=around%7C776:390&output-quality=90&crop=776:390;center,top',
    charity: 'https://heliosi.mashable.com/imagery/articles/02XkpE2QUptCEMWozwNko62/hero-image.fill.size_1200x675.v1614275401.png',
    cooking: 'https://cdn.mos.cms.futurecdn.net/XgfPddUNiPdQCcqekCBa6T.jpg',
    relaxation: 'https://e0.pxfuel.com/wallpapers/790/819/desktop-wallpaper-michael-scott-group.jpg',
    busywork: 'https://e1.pxfuel.com/desktop-wallpaper/589/630/desktop-wallpaper-michael-scott-prison-mike.jpg',
    music: 'https://pbs.twimg.com/media/EhyRSfSUwAAqYaO.jpg'
  };

  rotuloTipo(tipo: string): string {
    const key = (tipo?.toLowerCase() as TipoChave) || 'recreational';
    return this.infoCategorias[key]?.nome || 'Recreação';
  }

  imagemTipo(tipo: string): string {
    const key = (tipo?.toLowerCase() as TipoChave) || 'recreational';
    return this.imagens[key] || this.imagens.recreational;
  }

  // Método para lidar com erro de carregamento de imagem
  handleImageError(event: any, tipo: string) {
    const key = (tipo?.toLowerCase() as TipoChave) || 'recreational';
    event.target.src = this.imagensFallback[key];
  }

  iconeTipo(tipo: string): string {
    const key = (tipo?.toLowerCase() as TipoChave) || 'recreational';
    return this.infoCategorias[key]?.icone || 'fas fa-question-circle';
  }

  citacaoTipo(tipo: string): string {
    const key = (tipo?.toLowerCase() as TipoChave) || 'recreational';
    return this.infoCategorias[key]?.citacao || '"Às vezes você precisa se divertir um pouco."';
  }

  precoLabel(price: number): string {
    if (price === 0) return 'Grátis';
    if (price <= 0.3) return 'Baixo Custo';
    if (price <= 0.6) return 'Custo Moderado';
    return 'Alto Custo';
  }

  acessLabel(accessibility: number): string {
    if (accessibility <= 0.25) return 'Muito Acessível';
    if (accessibility <= 0.5) return 'Acessível';
    if (accessibility <= 0.75) return 'Moderadamente Acessível';
    return 'Pouco Acessível';
  }

  buscar(): void {
    this.carregando = true;
    this.erro = false;
    this.atividade = null;

    const participantesNum =
      this.participantes === '' ? undefined : Number(this.participantes);
    const tipoFinal = this.tipo === '' ? undefined : this.tipo;

    this.service.getActivitiesByFilter(tipoFinal, participantesNum).subscribe({
      next: (lista: any[]) => {
        console.log('✅ Resposta da API:', lista);
        if (!lista?.length) {
          this.erro = true;
          this.carregando = false;
          return;
        }
        const i = Math.floor(Math.random() * lista.length);
        this.atividade = lista[i];
        this.carregando = false;
      },
      error: (err) => {
        console.error('❌ Erro de requisição:', err);
        this.erro = true;
        this.carregando = false;
      },
    });
  }

  // Método para selecionar uma categoria específica
  selecionarCategoria(categoria: TipoChave): void {
    this.tipo = categoria;
    this.buscar();
  }
}