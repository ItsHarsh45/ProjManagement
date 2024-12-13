// Application-wide constants
export const APP_NAME = 'InnoHub';
export const ADMIN_EMAILS = ['harshkemali123@gmail.com'];
export const PROJECT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;

export const ROUTES = {
  HOME: '/',
  PROJECTS: '/projects',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ADMIN: '/admin'
} as const;