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

  // Detailed information about each category
  private readonly infoCategorias: Record<TipoChave, CategoriaInfo> = {
    education: {
      nome: 'Education',
      icone: 'fas fa-graduation-cap',
      descricao: 'Learn something new and expand your knowledge',
      citacao: '"Sometimes I start a sentence and I don’t even know where it’s going. Like a politician, but I finish with more points."'
    },
    recreational: {
      nome: 'Recreation',
      icone: 'fas fa-gamepad',
      descricao: 'Fun and games to relax and enjoy yourself',
      citacao: '"I’m not superstitious, but I am a little stitious."'
    },
    social: {
      nome: 'Social',
      icone: 'fas fa-users',
      descricao: 'Activities to do with friends or meet new people',
      citacao: '"I am friends with everybody in this office. We’re all best friends."'
    },
    charity: {
      nome: 'Charity',
      icone: 'fas fa-hand-holding-heart',
      descricao: 'Actions that benefit other people and the community',
      citacao: '"The best way to get rid of pain is to give someone a gift."'
    },
    cooking: {
      nome: 'Cooking',
      icone: 'fas fa-utensils',
      descricao: 'Recipes and delicious gastronomic experiences',
      citacao: '"My sauce is the best in the world. My grandmother passed down the recipe."'
    },
    relaxation: {
      nome: 'Relaxation',
      icone: 'fas fa-spa',
      descricao: 'Activities to calm the mind and reduce stress',
      citacao: '"Stress is basically a lack of understanding of how things work."'
    },
    busywork: {
      nome: 'Do It Yourself',
      icone: 'fas fa-tools',
      descricao: 'Manual projects and practical activities',
      citacao: '"Why use many word when few word do trick?"'
    },
    music: {
      nome: 'Music',
      icone: 'fas fa-music',
      descricao: 'Musical activities for all tastes',
      citacao: '"I sing in the shower. Sometimes I spend so much time singing that I forget to wash myself."'
    }
  };

  // Local images for each category
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

  // Fallback images
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
    return this.infoCategorias[key]?.nome || 'Recreation';
  }

  imagemTipo(tipo: string): string {
    const key = (tipo?.toLowerCase() as TipoChave) || 'recreational';
    return this.imagens[key] || this.imagens.recreational;
  }

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
    return this.infoCategorias[key]?.citacao || '"Sometimes you just need to have a little fun."';
  }

  precoLabel(price: number): string {
    if (price === 0) return 'Free';
    if (price <= 0.3) return 'Low Cost';
    if (price <= 0.6) return 'Moderate Cost';
    return 'High Cost';
  }

  acessLabel(accessibility: number): string {
    if (accessibility <= 0.25) return 'Very Accessible';
    if (accessibility <= 0.5) return 'Accessible';
    if (accessibility <= 0.75) return 'Moderately Accessible';
    return 'Hardly Accessible';
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
        console.log('✅ API Response:', lista);
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
        console.error('❌ Request Error:', err);
        this.erro = true;
        this.carregando = false;
      },
    });
  }

  selecionarCategoria(categoria: TipoChave): void {
    this.tipo = categoria;
    this.buscar();
  }
}
