import * as THREE from 'three';
import gsap from 'gsap';

export interface BookOptions {
  pageWidth: number;
  pageHeight: number;
  pageThickness: number;
  pageColor: number;
  numPages?: number;
}

export class Book {
  public group: THREE.Group;
  private leftCoverPivot: THREE.Group;
  private rightCoverPivot: THREE.Group;
  private leftCover: THREE.Mesh;
  private rightCover: THREE.Mesh;
  private pages: THREE.Mesh[] = [];
  private pagesGroup: THREE.Group;
  private options: BookOptions;
  private isOpen: boolean = false;
  private isAnimating: boolean = false;

  constructor(options: BookOptions) {
    this.options = options;
    this.group = new THREE.Group();
    // Attach the Book instance to the group for easy access via raycasting
    this.group.userData.bookInstance = this;

    const { pageWidth, pageHeight, pageThickness, pageColor, numPages = 10 } = options;
    const coverMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const pageMaterial = new THREE.MeshStandardMaterial({ color: pageColor });

    // --- Left Cover with Pivot ---
    this.leftCoverPivot = new THREE.Group();
    // Pivot positioned at the inner edge of the left cover (spine)
    this.leftCoverPivot.position.set(-pageWidth / 2, 0, 0);
    const leftCoverGeo = new THREE.BoxGeometry(pageWidth, pageHeight, pageThickness);
    this.leftCover = new THREE.Mesh(leftCoverGeo, coverMaterial);
    // Shift mesh so that its right edge aligns with the pivot (0,0,0)
    this.leftCover.position.set(-pageWidth / 2, 0, 0);
    this.leftCoverPivot.add(this.leftCover);
    this.group.add(this.leftCoverPivot);

    // --- Right Cover with Pivot ---
    this.rightCoverPivot = new THREE.Group();
    // Pivot positioned at the inner edge of the right cover (spine)
    this.rightCoverPivot.position.set(pageWidth / 2, 0, 0);
    const rightCoverGeo = new THREE.BoxGeometry(pageWidth, pageHeight, pageThickness);
    this.rightCover = new THREE.Mesh(rightCoverGeo, coverMaterial);
    // Shift mesh so that its left edge aligns with the pivot
    this.rightCover.position.set(pageWidth / 2, 0, 0);
    this.rightCoverPivot.add(this.rightCover);
    this.group.add(this.rightCoverPivot);

    // --- Pages Group ---
    // Create a separate group for pages so they can be animated independently.
    // Position pagesGroup so that pages lie inside the book.
    this.pagesGroup = new THREE.Group();
    // Place pagesGroup slightly forward from the spine (z-axis) so they’re visible when opened.
    this.pagesGroup.position.set(0, 0, pageThickness / 2);
    this.group.add(this.pagesGroup);

    // Generate pages (inspired by turn.js, but now as 3D meshes)
    for (let i = 0; i < numPages; i++) {
      // Here you could later replace PlaneGeometry with a canvas texture rendering dynamic HTML content.
      const pageGeo = new THREE.PlaneGeometry(pageWidth * 0.95, pageHeight * 0.95, 32, 32);
      const page = new THREE.Mesh(pageGeo, pageMaterial);
      // Stack pages with a slight offset on the z-axis.
      page.position.set(0, 0, -i * (pageThickness * 0.2));
      // Initially, set the page rotation to simulate that it’s tucked behind the covers.
      page.rotation.y = 0;
      this.pages.push(page);
      this.pagesGroup.add(page);
    }
  }

  // Toggle book open/close with improved cover and page animations.
  public toggleOpen() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.isOpen = !this.isOpen;

    // Animate covers using pivot rotation (turn.js style)
    const leftCoverTarget = this.isOpen ? -Math.PI / 2 : 0;
    const rightCoverTarget = this.isOpen ? Math.PI / 2 : 0;

    gsap.to(this.leftCoverPivot.rotation, {
      y: leftCoverTarget,
      duration: 1.2,
      ease: 'power2.inOut',
    });
    gsap.to(this.rightCoverPivot.rotation, {
      y: rightCoverTarget,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        // Animate pages after covers complete.
        if (this.isOpen) {
          this.animatePagesOpen();
        } else {
          this.animatePagesClose();
        }
        this.isAnimating = false;
      },
    });
  }

  // Alias for toggleOpen
  public toggle() {
    this.toggleOpen();
  }

  // Animate pages to move forward and simulate a page-flip effect.
  private animatePagesOpen() {
    // Here we mimic the "turn" effect by shifting pages outward.
    gsap.to(this.pagesGroup.position, {
      z: this.options.pageThickness * 2,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: () => {
        // Optionally, add per-page rotation effects here to simulate curling, inspired by turn.js.
        this.pages.forEach((page, i) => {
          // Calculate a slight delay or differential based on the page index.
          const delayFactor = i * 0.02;
          // Rotate each page slightly for a realistic spread effect.
          gsap.to(page.rotation, {
            y: 0.1 * (i % 2 === 0 ? 1 : -1),
            duration: 0.8,
            ease: 'power2.out',
            delay: delayFactor,
          });
        });
      },
    });
  }

  // Animate pages to retract when the book closes.
  private animatePagesClose() {
    gsap.to(this.pagesGroup.position, {
      z: this.options.pageThickness / 2,
      duration: 0.8,
      ease: 'power2.in',
      onUpdate: () => {
        // Reset the per-page rotation as the book closes.
        this.pages.forEach((page, i) => {
          gsap.to(page.rotation, {
            y: 0,
            duration: 0.8,
            ease: 'power2.in',
            delay: i * 0.02,
          });
        });
      },
    });
  }

  // Optional: Flip a single page animation
  public flipPage(index: number) {
    if (index < 0 || index >= this.pages.length) return;
    const page = this.pages[index];
    // Use a pivot-style flip for a more natural effect.
    gsap.to(page.rotation, {
      y: Math.PI,
      duration: 1,
      ease: 'power2.inOut',
    });
  }

  // Clean up resources
  public dispose() {
    this.leftCover.geometry.dispose();
    (this.leftCover.material as THREE.Material).dispose();
    this.rightCover.geometry.dispose();
    (this.rightCover.material as THREE.Material).dispose();
    this.pages.forEach((page) => {
      page.geometry.dispose();
      (page.material as THREE.Material).dispose();
    });
  }
}
