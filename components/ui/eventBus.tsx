// eventBus.ts
type Listener = (message: string) => void;

class EventBus {
  private listeners: Listener[] = [];

  on(listener: Listener) {
    this.listeners.push(listener);
  }

  off(listener: Listener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  emit(message: string) {
    this.listeners.forEach(listener => listener(message));
  }
}

export const eventBus = new EventBus();