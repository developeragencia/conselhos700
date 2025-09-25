const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com' 
  : 'http://localhost:3001';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Banner Slides
  async getBannerSlides() {
    return this.request('/banner-slides');
  }

  async createBannerSlide(slide: any) {
    return this.request('/banner-slides', {
      method: 'POST',
      body: JSON.stringify(slide),
    });
  }

  // Blog Posts
  async getBlogPosts() {
    return this.request('/blog-posts');
  }

  async getBlogPost(id: number) {
    return this.request(`/blog-posts/${id}`);
  }

  async getBlogPostBySlug(slug: string) {
    return this.request(`/blog-posts/slug/${slug}`);
  }

  async createBlogPost(post: any) {
    return this.request('/blog-posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  }

  // Consultants
  async getConsultants() {
    return this.request('/consultants');
  }

  async getConsultant(id: number) {
    return this.request(`/consultants/${id}`);
  }

  async getConsultantBySlug(slug: string) {
    return this.request(`/consultants/slug/${slug}`);
  }

  async createConsultant(consultant: any) {
    return this.request('/consultants', {
      method: 'POST',
      body: JSON.stringify(consultant),
    });
  }

  // Credit Packages
  async getCreditPackages() {
    return this.request('/credit-packages');
  }

  async getCreditPackage(id: number) {
    return this.request(`/credit-packages/${id}`);
  }

  async createCreditPackage(pkg: any) {
    return this.request('/credit-packages', {
      method: 'POST',
      body: JSON.stringify(pkg),
    });
  }

  // Users
  async getUsers() {
    return this.request('/users');
  }

  async getUser(id: number) {
    return this.request(`/users/${id}`);
  }

  async createUser(user: any) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  // Consultation Sessions
  async getConsultationSessions() {
    return this.request('/consultation-sessions');
  }

  async getConsultationSession(id: number) {
    return this.request(`/consultation-sessions/${id}`);
  }

  async createConsultationSession(session: any) {
    return this.request('/consultation-sessions', {
      method: 'POST',
      body: JSON.stringify(session),
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;