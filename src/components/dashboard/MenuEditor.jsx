import React, { useState, useRef } from 'react';
import { Search, Plus, Edit, Trash, ChevronDown, ChevronUp, Save, X, FileImage, Tag, Coffee, Utensils, MessageCircle } from 'lucide-react';
import AdminLayout from '../layout/AdminLayout';

const MenuEditor = () => {
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: 'Italian Bistro' },
    { id: 2, name: 'Sushiteria' },
    { id: 3, name: 'Burger House' },
    { id: 4, name: 'Pasta Paradise' }
  ]);
  
  const [selectedRestaurant, setSelectedRestaurant] = useState(1);
  
  const [menuData, setMenuData] = useState([
    {
      id: 1,
      restaurantId: 1,
      name: 'Starters',
      description: 'Small plates to begin your meal',
      items: [
        {
          id: 101,
          name: 'Bruschetta',
          description: 'Toasted bread topped with fresh tomatoes, garlic, and basil',
          price: 6.99,
          image: null,
          isVegetarian: true,
          isVegan: true,
          isGlutenFree: false,
          allergens: ['Gluten'],
          available: true
        },
        {
          id: 102,
          name: 'Caprese Salad',
          description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze',
          price: 8.99,
          image: null,
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: true,
          allergens: ['Dairy'],
          available: true
        }
      ]
    },
    {
      id: 2,
      restaurantId: 1,
      name: 'Main Courses',
      description: 'Our delicious main dishes',
      items: [
        {
          id: 201,
          name: 'Spaghetti Carbonara',
          description: 'Classic pasta with pancetta, egg, and pecorino cheese',
          price: 14.99,
          image: null,
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: false,
          allergens: ['Gluten', 'Eggs', 'Dairy'],
          available: true
        },
        {
          id: 202,
          name: 'Margherita Pizza',
          description: 'Traditional pizza with tomato sauce, mozzarella, and basil',
          price: 12.99,
          image: null,
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: false,
          allergens: ['Gluten', 'Dairy'],
          available: true
        }
      ]
    },
    {
      id: 3,
      restaurantId: 1,
      name: 'Desserts',
      description: 'Sweet treats to finish your meal',
      items: [
        {
          id: 301,
          name: 'Tiramisu',
          description: 'Coffee-flavored Italian dessert with layers of mascarpone and ladyfingers',
          price: 7.99,
          image: null,
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: false,
          allergens: ['Gluten', 'Dairy', 'Eggs'],
          available: true
        },
        {
          id: 302,
          name: 'Panna Cotta',
          description: 'Italian dessert of sweetened cream set with gelatin',
          price: 6.99,
          image: null,
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: true,
          allergens: ['Dairy'],
          available: true
        }
      ]
    },
    {
      id: 4,
      restaurantId: 1,
      name: 'Drinks',
      description: 'Beverages to complement your meal',
      items: [
        {
          id: 401,
          name: 'House Red Wine',
          description: 'Glass of our selected Italian red wine',
          price: 5.99,
          image: null,
          isVegetarian: true,
          isVegan: true,
          isGlutenFree: true,
          allergens: ['Sulfites'],
          available: true
        },
        {
          id: 402,
          name: 'Espresso',
          description: 'Single shot of our premium Italian coffee',
          price: 2.99,
          image: null,
          isVegetarian: true,
          isVegan: true,
          isGlutenFree: true,
          allergens: [],
          available: true
        }
      ]
    }
  ]);

  // State for search
  const [search, setSearch] = useState('');
  
  // State for editing
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [newCategoryData, setNewCategoryData] = useState({ name: '', description: '' });
  const [newItemParentCategory, setNewItemParentCategory] = useState(null);
  const [newItemData, setNewItemData] = useState({
    name: '',
    description: '',
    price: 0,
    image: null,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    allergens: [],
    available: true
  });
  
  // Ref for file input
  const fileInputRef = useRef(null);
  
  // Handler for showing the new category form
  const handleShowNewCategoryForm = () => {
    setShowNewCategoryForm(true);
    setNewCategoryData({ name: '', description: '' });
  };
  
  // Handler for adding a new category
  const handleAddCategory = () => {
    const newCategory = {
      id: Math.max(...menuData.map(cat => cat.id)) + 1,
      restaurantId: selectedRestaurant,
      name: newCategoryData.name,
      description: newCategoryData.description,
      items: []
    };
    
    setMenuData([...menuData, newCategory]);
    setShowNewCategoryForm(false);
    setNewCategoryData({ name: '', description: '' });
  };
  
  // Handler for editing a category
  const handleEditCategory = (categoryId) => {
    const category = menuData.find(cat => cat.id === categoryId);
    setEditingCategory({...category});
  };
  
  // Handler for saving an edited category
  const handleSaveCategory = () => {
    setMenuData(menuData.map(cat => 
      cat.id === editingCategory.id ? editingCategory : cat
    ));
    setEditingCategory(null);
  };
  
  // Handler for deleting a category
  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? All items within this category will also be deleted.')) {
      setMenuData(menuData.filter(cat => cat.id !== categoryId));
    }
  };
  
  // Handler for showing the new item form
  const handleShowNewItemForm = (categoryId) => {
    setNewItemParentCategory(categoryId);
    setShowNewItemForm(true);
    setNewItemData({
      name: '',
      description: '',
      price: 0,
      image: null,
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      allergens: [],
      available: true
    });
  };
  
  // Handler for adding a new item
  const handleAddItem = () => {
    const newItem = {
      id: Math.max(...menuData.flatMap(cat => cat.items.map(item => item.id)), 0) + 1,
      ...newItemData
    };
    
    setMenuData(menuData.map(cat => 
      cat.id === newItemParentCategory 
        ? {...cat, items: [...cat.items, newItem]} 
        : cat
    ));
    
    setShowNewItemForm(false);
    setNewItemParentCategory(null);
    setNewItemData({
      name: '',
      description: '',
      price: 0,
      image: null,
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      allergens: [],
      available: true
    });
  };
  
  // Handler for editing an item
  const handleEditItem = (categoryId, itemId) => {
    const category = menuData.find(cat => cat.id === categoryId);
    const item = category.items.find(item => item.id === itemId);
    setEditingItem({...item, categoryId});
  };
  
  // Handler for saving an edited item
  const handleSaveItem = () => {
    const { categoryId, ...itemData } = editingItem;
    
    setMenuData(menuData.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat, 
            items: cat.items.map(item => 
              item.id === itemData.id ? itemData : item
            )
          } 
        : cat
    ));
    
    setEditingItem(null);
  };
  
  // Handler for deleting an item
  const handleDeleteItem = (categoryId, itemId) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      setMenuData(menuData.map(cat => 
        cat.id === categoryId 
          ? {...cat, items: cat.items.filter(item => item.id !== itemId)} 
          : cat
      ));
    }
  };
  
  // Handler for allergen input
  const handleAllergenInput = (value, itemState, setItemState) => {
    const allergensList = value.split(',')
      .map(allergen => allergen.trim())
      .filter(allergen => allergen);
      
    setItemState({...itemState, allergens: allergensList});
  };
  
  // Handler for uploading an image
  const handleImageUpload = (e, itemState, setItemState) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload to a server and get a URL back
      // For demo purposes, we'll use a placeholder
      setItemState({...itemState, image: URL.createObjectURL(file)});
    }
  };
  
  // Filter menu data based on search
  const filteredMenuData = menuData
    .filter(category => category.restaurantId === selectedRestaurant)
    .filter(category => {
      const matchesCategory = category.name.toLowerCase().includes(search.toLowerCase());
      const matchesItems = category.items.some(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
      
      return matchesCategory || matchesItems;
    })
    .map(category => ({
      ...category,
      items: search 
        ? category.items.filter(item => 
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
          )
        : category.items
    }));
  
  // Item Editor Component
  const ItemEditorForm = ({ item, setItem, onSave, onCancel, isNew = false }) => {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title mb-3">{isNew ? 'Add New Item' : 'Edit Item'}</h3>
          
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label">Item Name</label>
              <input 
                type="text"
                className="form-control"
                value={item.name}
                onChange={(e) => setItem({...item, name: e.target.value})}
                placeholder="e.g. Margherita Pizza"
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Price (£)</label>
              <input 
                type="number"
                step="0.01"
                min="0"
                className="form-control"
                value={item.price}
                onChange={(e) => setItem({...item, price: parseFloat(e.target.value)})}
                placeholder="0.00"
              />
            </div>
            
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea 
                className="form-control"
                rows="2"
                value={item.description}
                onChange={(e) => setItem({...item, description: e.target.value})}
                placeholder="Describe this item..."
              ></textarea>
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Image</label>
              <div className="d-flex align-items-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="btn btn-light me-2"
                >
                  <FileImage size={16} className="me-1" /> Select Image
                </button>
                {item.image && (
                  <span className="text-success small">Image selected</span>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="d-none" 
                accept="image/*"
                onChange={(e) => handleImageUpload(e, item, setItem)}
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Allergens (comma separated)</label>
              <input 
                type="text"
                className="form-control"
                value={item.allergens.join(', ')}
                onChange={(e) => handleAllergenInput(e.target.value, item, setItem)}
                placeholder="e.g. Gluten, Dairy, Nuts"
              />
            </div>
            
            <div className="col-12">
              <label className="form-label mb-2">Dietary Options</label>
              <div className="d-flex flex-wrap gap-3">
                <div className="form-check">
                  <input 
                    type="checkbox"
                    id={`vegetarian-${isNew ? 'new' : item.id}`}
                    checked={item.isVegetarian}
                    onChange={(e) => setItem({...item, isVegetarian: e.target.checked})}
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor={`vegetarian-${isNew ? 'new' : item.id}`}>Vegetarian</label>
                </div>
                
                <div className="form-check">
                  <input 
                    type="checkbox"
                    id={`vegan-${isNew ? 'new' : item.id}`}
                    checked={item.isVegan}
                    onChange={(e) => setItem({...item, isVegan: e.target.checked})}
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor={`vegan-${isNew ? 'new' : item.id}`}>Vegan</label>
                </div>
                
                <div className="form-check">
                  <input 
                    type="checkbox"
                    id={`gluten-free-${isNew ? 'new' : item.id}`}
                    checked={item.isGlutenFree}
                    onChange={(e) => setItem({...item, isGlutenFree: e.target.checked})}
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor={`gluten-free-${isNew ? 'new' : item.id}`}>Gluten Free</label>
                </div>
                
                <div className="form-check">
                  <input 
                    type="checkbox"
                    id={`available-${isNew ? 'new' : item.id}`}
                    checked={item.available}
                    onChange={(e) => setItem({...item, available: e.target.checked})}
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor={`available-${isNew ? 'new' : item.id}`}>Available</label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="d-flex justify-content-end gap-2">
            <button 
              onClick={onCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button 
              onClick={onSave}
              className="btn btn-success"
            >
              <Save size={16} className="me-1" /> Save
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Item Display Component
  const ItemDisplay = ({ item, categoryId }) => {
    return (
      <div className={`card mb-3 ${!item.available ? 'border-danger bg-danger bg-opacity-10' : ''}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="card-title">{item.name} {!item.available && <span className="badge text-bg-danger">Unavailable</span>}</h5>
              <p className="card-text text-muted small">{item.description}</p>
              
              <div className="d-flex flex-wrap gap-1 mt-2">
                {item.isVegetarian && (
                  <span className="badge text-bg-success">Vegetarian</span>
                )}
                {item.isVegan && (
                  <span className="badge text-bg-success">Vegan</span>
                )}
                {item.isGlutenFree && (
                  <span className="badge text-bg-primary">Gluten Free</span>
                )}
                {item.allergens.length > 0 && (
                  <span className="badge text-bg-warning">
                    Contains: {item.allergens.join(', ')}
                  </span>
                )}
              </div>
            </div>
            
            <div className="d-flex flex-column align-items-end">
              <span className="fw-bold">£{item.price.toFixed(2)}</span>
              
              <div className="btn-group mt-2">
                <button 
                  onClick={() => handleEditItem(categoryId, item.id)}
                  className="btn btn-sm btn-outline-primary"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDeleteItem(categoryId, item.id)}
                  className="btn btn-sm btn-outline-danger"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Category Display Component
  const CategoryDisplay = ({ category }) => {
    const [expanded, setExpanded] = useState(true);
    
    return (
      <div className="card mb-4">
        <div 
          className="card-header d-flex justify-content-between align-items-center"
          role="button"
          onClick={() => setExpanded(!expanded)}
        >
          <div>
            <h5 className="mb-0">{category.name}</h5>
            <small className="text-muted">{category.description}</small>
          </div>
          
          <div className="d-flex align-items-center gap-2">
            <span className="badge text-bg-secondary">{category.items.length} items</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleEditCategory(category.id);
              }}
              className="btn btn-sm btn-outline-primary"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteCategory(category.id);
              }}
              className="btn btn-sm btn-outline-danger"
            >
              <Trash size={16} />
            </button>
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
        
        {expanded && (
          <div className="card-body bg-light">
            {category.items.length > 0 ? (
              category.items.map(item => (
                <ItemDisplay key={item.id} item={item} categoryId={category.id} />
              ))
            ) : (
              <p className="text-muted text-center py-3">No items in this category</p>
            )}
            
            <button 
              onClick={() => handleShowNewItemForm(category.id)}
              className="btn btn-primary btn-sm w-100 mt-3"
            >
              <Plus size={16} className="me-1" /> Add Item to {category.name}
            </button>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <AdminLayout title="Menu Management">
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Menu Management</h1>
        </div>
        
        {/* Restaurant Selection and Search */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Select Restaurant</label>
                <select 
                  className="form-select"
                  value={selectedRestaurant}
                  onChange={(e) => setSelectedRestaurant(parseInt(e.target.value))}
                >
                  {restaurants.map(restaurant => (
                    <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-8">
                <label className="form-label">Search Menu</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search for items or categories..."
                    className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="mb-4">
          {/* Category Editor */}
          {editingCategory && (
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title mb-3">Edit Category</h3>
                
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Category Name</label>
                    <input 
                      type="text"
                      className="form-control"
                      value={editingCategory.name}
                      onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Description</label>
                    <input 
                      type="text"
                      className="form-control"
                      value={editingCategory.description}
                      onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="d-flex justify-content-end gap-2">
                  <button 
                    onClick={() => setEditingCategory(null)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveCategory}
                    className="btn btn-success"
                  >
                    <Save size={16} className="me-1" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Item Editor */}
          {editingItem && (
            <ItemEditorForm 
              item={editingItem}
              setItem={setEditingItem}
              onSave={handleSaveItem}
              onCancel={() => setEditingItem(null)}
            />
          )}
          
          {/* New Category Form */}
          {showNewCategoryForm && (
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title mb-3">Add New Category</h3>
                
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Category Name</label>
                    <input 
                      type="text"
                      className="form-control"
                      value={newCategoryData.name}
                      onChange={(e) => setNewCategoryData({...newCategoryData, name: e.target.value})}
                      placeholder="e.g. Starters, Main Courses, Desserts"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Description</label>
                    <input 
                      type="text"
                      className="form-control"
                      value={newCategoryData.description}
                      onChange={(e) => setNewCategoryData({...newCategoryData, description: e.target.value})}
                      placeholder="A short description of this menu section"
                    />
                  </div>
                </div>
                
                <div className="d-flex justify-content-end gap-2">
                  <button 
                    onClick={() => setShowNewCategoryForm(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAddCategory}
                    className="btn btn-success"
                    disabled={!newCategoryData.name}
                  >
                    <Save size={16} className="me-1" /> Add Category
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* New Item Form */}
          {showNewItemForm && (
            <ItemEditorForm 
              item={newItemData}
              setItem={setNewItemData}
              onSave={handleAddItem}
              onCancel={() => {
                setShowNewItemForm(false);
                setNewItemParentCategory(null);
              }}
              isNew={true}
            />
          )}
          
          {/* Menu Categories and Items */}
          {filteredMenuData.length > 0 ? (
            filteredMenuData.map(category => (
              <CategoryDisplay key={category.id} category={category} />
            ))
          ) : (
            <div className="card text-center p-4">
              <div className="card-body">
                <MessageCircle size={48} className="text-muted mb-3" />
                <h5 className="card-title">No menu items found</h5>
                <p className="card-text text-muted">
                  {search ? 'Try adjusting your search or' : 'Start by'} adding a category to the menu.
                </p>
              </div>
            </div>
          )}
          
          {/* Add New Category Button */}
          <button 
            onClick={handleShowNewCategoryForm}
            className="btn btn-primary w-100 mt-4 py-2"
          >
            <Plus size={20} className="me-2" /> Add New Menu Category
          </button>
        </div>
        
        {/* Quick Tips Section */}
        <div className="card bg-warning bg-opacity-10 border-warning">
          <div className="card-body">
            <h5 className="card-title d-flex align-items-center">
              <Coffee size={20} className="me-2 text-warning" /> Menu Management Tips
            </h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-transparent border-0 py-1">Keep menu descriptions concise but appetizing.</li>
              <li className="list-group-item bg-transparent border-0 py-1">Always include allergen information for customer safety.</li>
              <li className="list-group-item bg-transparent border-0 py-1">Add high-quality images to showcase your dishes.</li>
              <li className="list-group-item bg-transparent border-0 py-1">Mark items as unavailable rather than removing them during temporary shortages.</li>
              <li className="list-group-item bg-transparent border-0 py-1">Group similar items under well-organized categories.</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MenuEditor;