import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, createProduct, deleteProduct, type Product } from '../services/products.service';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ShoppingBag, Plus, Trash2 } from 'lucide-react';

export default function Products() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowForm(false);
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      setLinkUrl('');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      name,
      description,
      price: parseFloat(price),
      imageUrl,
      linkUrl
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Product Catalog</h1>
          <p className="text-muted-foreground mt-2">Manage products that your AI can recommend to customers.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          {showForm ? 'Cancel' : <><Plus size={18} /> Add Product</>}
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <Input required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Red Running Shoes" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <Input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="99.99" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <Input required value={description} onChange={e => setDescription(e.target.value)} placeholder="A brief description of the product." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Checkout Link URL</label>
              <Input value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://..." />
            </div>
            <div className="md:col-span-2 flex justify-end mt-4">
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Saving...' : 'Save Product'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="text-center text-muted-foreground py-12">Loading catalog...</div>
      ) : products.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center shadow-sm">
          <ShoppingBag size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-medium text-foreground">No products yet</h3>
          <p className="text-muted-foreground mt-2">Add products to your catalog so the AI can recommend them in chats.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <div key={product._id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col group">
              <div className="h-48 bg-muted/20 relative">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                )}
                <button 
                  onClick={() => deleteMutation.mutate(product._id)}
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur text-destructive p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-foreground line-clamp-1">{product.name}</h3>
                  <span className="font-medium text-primary">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">{product.description}</p>
                {product.linkUrl && (
                  <a href={product.linkUrl} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">View Link</a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
