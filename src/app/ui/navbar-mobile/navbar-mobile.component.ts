import { Component, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-mobile',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,  CommonModule],
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css'],
})
export class NavbarMobileComponent implements OnDestroy {
  isVisible = true;
  private activityTimeout: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.detectUserActivity();
    }
  }

  private detectUserActivity(): void {
    this.isVisible = true;

    // Agregar listeners de actividad del usuario
    window.addEventListener('keydown', this.handleUserActivity.bind(this));
    window.addEventListener('scroll', this.handleUserActivity.bind(this));
  }

  private handleUserActivity(): void {
    this.isVisible = false;
    clearTimeout(this.activityTimeout); // Limpia el timeout previo si existe

    // Reiniciar el estado de visibilidad después de 3 segundos de inactividad
    this.activityTimeout = setTimeout(() => {
      this.isVisible = true;
    }, 2000); // Ajusta el tiempo de inactividad aquí si lo deseas
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Elimina los event listeners para evitar posibles fugas de memoria
      window.removeEventListener('keydown', this.handleUserActivity.bind(this));
      window.removeEventListener('scroll', this.handleUserActivity.bind(this));
      clearTimeout(this.activityTimeout);
    }
  }
}
