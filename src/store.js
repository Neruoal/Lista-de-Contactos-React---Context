export const initialStore = () => {
  return {
    contacts: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_contacts": {
      return {
        ...store,
        contacts: action.payload
      };
    }
    case "add_contact": {
      const nextContact = {
        ...action.payload,
        id: String(Date.now())
      };

      return {
        ...store,
        contacts: [nextContact, ...store.contacts]
      };
    }
    case "update_contact": {
      const { id, updates } = action.payload;

      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === id ? { ...contact, ...updates } : contact
        )
      };
    }
    case "delete_contact": {
      return {
        ...store,
        contacts: store.contacts.filter((contact) => contact.id !== action.payload.id)
      };
    }
    default:
      return store;
  }
}
