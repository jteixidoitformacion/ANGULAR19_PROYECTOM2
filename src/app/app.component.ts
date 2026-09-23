import { Component, computed, signal } from '@angular/core';

type ExerciseId = 1 | 2 | 3 | 4 | 5;
type Priority = 'baja' | 'media' | 'alta';

interface Exercise {
  id: ExerciseId;
  title: string;
  label: string;
}

interface Project {
  id: number;
  name: string;
  priority: Priority;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly exercises: Exercise[] = [
    { id: 1, title: 'Componentes standalone', label: 'Composición autónoma' },
    { id: 2, title: 'Data binding moderno', label: 'Signals sin FormsModule' },
    { id: 3, title: 'Control de flujo', label: '@if, @for y @switch' },
    { id: 4, title: 'Carga diferida', label: '@defer y triggers' },
    { id: 5, title: 'Reto integrador', label: 'Panel de proyectos' }
  ];

  readonly activeExercise = signal<ExerciseId>(1);
  readonly searchTerm = signal('');
  readonly userRole = signal<'admin' | 'editor' | 'reader'>('editor');
  readonly projectName = signal('');
  readonly projectPriority = signal<Priority>('media');
  readonly projects = signal<Project[]>([
    { id: 1, name: 'Portal de proveedores', priority: 'alta' },
    { id: 2, name: 'Panel de incidencias', priority: 'media' }
  ]);

  readonly services = ['Catálogo de cursos', 'Aula virtual', 'Soporte docente', 'Certificaciones'];
  readonly ipAddresses = ['192.168.1.1', '192.168.1.10', '192.168.1.25'];
  readonly filteredServices = computed(() => {
    const term = this.searchTerm().trim().toLocaleLowerCase();
    return term ? this.services.filter((service) => service.toLocaleLowerCase().includes(term)) : this.services;
  });
  readonly projectCount = computed(() => this.projects().length);

  selectExercise(exerciseId: ExerciseId): void {
    this.activeExercise.set(exerciseId);
  }

  updateSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }

  setRole(role: 'admin' | 'editor' | 'reader'): void {
    this.userRole.set(role);
  }

  updateProjectName(event: Event): void {
    this.projectName.set((event.target as HTMLInputElement).value);
  }

  updateProjectPriority(event: Event): void {
    this.projectPriority.set((event.target as HTMLSelectElement).value as Priority);
  }

  addProject(): void {
    const name = this.projectName().trim();
    if (!name) {
      return;
    }

    this.projects.update((projects) => [
      ...projects,
      { id: Date.now(), name, priority: this.projectPriority() }
    ]);
    this.projectName.set('');
  }
}
