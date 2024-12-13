import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { PROJECT_STATUS } from '../constants';
import type { Project, ProjectFormData } from '../../types/project';

export class ProjectService {
  private static collection = 'projects';

  static async getProjects(status?: string, userId?: string, limit = 50): Promise<Project[]> {
    try {
      const constraints = [];
      
      if (status) {
        constraints.push(where('status', '==', status));
      }
      
      if (userId) {
        constraints.push(where('userId', '==', userId));
      }

      const q = query(collection(db, this.collection), ...constraints);
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  static async submitProject(data: ProjectFormData, userId: string): Promise<void> {
    try {
      await addDoc(collection(db, this.collection), {
        ...data,
        status: PROJECT_STATUS.PENDING,
        userId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error('Error submitting project:', error);
      throw error;
    }
  }

  static async updateProjectStatus(projectId: string, status: string): Promise<void> {
    try {
      const projectRef = doc(db, this.collection, projectId);
      await updateDoc(projectRef, {
        status,
        updatedAt: Date.now()
      });
    } catch (error) {
      console.error('Error updating project status:', error);
      throw error;
    }
  }
}