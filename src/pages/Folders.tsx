import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { addFolder, updateFolder, deleteFolder } from '@/lib/storage';
import { Cabinet, Shelf, Folder, Procurement } from '@/types/procurement';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, FileText, Eye, FolderOpen, ArrowUp, Box as BoxIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const Folders: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const cabinetIdFromUrl = searchParams.get('cabinetId');
    const boxIdFromUrl = searchParams.get('boxId');

    const { shelves, cabinets, folders, boxes, procurements } = useData();

    // UI State
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isRelocateDialogOpen, setIsRelocateDialogOpen] = useState(false);
    const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
    const [relocateFolder, setRelocateFolder] = useState<Folder | null>(null);
    const [newStackNumber, setNewStackNumber] = useState<number>(0);

    // Filter state
    const [filterTier1Id, setFilterTier1Id] = useState<string>('');
    const [filterCabinetId, setFilterCabinetId] = useState<string>(cabinetIdFromUrl || '');
    const [filterBoxId, setFilterBoxId] = useState<string>(boxIdFromUrl || '');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState<'name' | 'code' | 'contents' | 'stackNumber'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Bulk Selection
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [selectedTier1Id, setSelectedTier1Id] = useState('');
    const [selectedTier2Id, setSelectedTier2Id] = useState('');
    const [selectedBoxId, setSelectedBoxId] = useState('');
    const [parentType, setParentType] = useState<'shelf' | 'box'>('shelf');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('#FF6B6B');

    const DEFAULT_COLORS = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
        '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#A8E6CF',
    ];

    useEffect(() => {
        if (cabinetIdFromUrl) {
            setFilterCabinetId(cabinetIdFromUrl);
            setFilterBoxId('');
            setFilterTier1Id('');
        }
        if (boxIdFromUrl) {
            setFilterBoxId(boxIdFromUrl);
            setFilterCabinetId('');
            setFilterTier1Id('');
        }
    }, [cabinetIdFromUrl, boxIdFromUrl]);

    // When box filter is set, clear drawer/cabinet filters and vice versa
    const handleFilterBoxChange = (val: string) => {
        setFilterBoxId(val);
        if (val && val !== 'all') {
            setFilterTier1Id('');
            setFilterCabinetId('');
        }
    };

    const handleFilterTier1Change = (val: string) => {
        setFilterTier1Id(val);
        setFilterCabinetId('');
        if (val && val !== 'all') setFilterBoxId('');
    };

    const handleFilterCabinetChange = (val: string) => {
        setFilterCabinetId(val);
        if (val && val !== 'all') setFilterBoxId('');
    };

    const resetForm = () => {
        setName('');
        setCode('');
        setSelectedTier1Id('');
        setSelectedTier2Id('');
        setSelectedBoxId('');
        setParentType('shelf');
        setDescription('');
        setColor('#FF6B6B');
        setCurrentFolder(null);
    };

    const handleAdd = async () => {
        if (!name || !code) {
            toast.error('Name and Code are required');
            return;
        }

        let parentId = '';
        if (parentType === 'shelf') {
            if (!selectedTier2Id) { toast.error('Parent Cabinet is required'); return; }
            parentId = selectedTier2Id;
        } else {
            if (!selectedBoxId) { toast.error('Parent Box is required'); return; }
            parentId = selectedBoxId;
        }

        try {
            await addFolder(parentId, name, code, description, color, parentType);
            setIsAddDialogOpen(false);
            resetForm();
            toast.success('Folder added successfully');
        } catch (error: any) {
            toast.error(`Failed to add folder: ${error.message || 'Unknown error'}`);
        }
    };

    const handleEditClick = (folder: Folder) => {
        setCurrentFolder(folder);
        setName(folder.name);
        setCode(folder.code);

        if (folder.boxId) {
            setParentType('box');
            setSelectedBoxId(folder.boxId);
            const box = boxes.find(b => b.id === folder.boxId);
            if (box) {
                if (box.shelfId) setSelectedTier2Id(box.shelfId);
                if (box.cabinetId) setSelectedTier1Id(box.cabinetId);
            }
        } else if (folder.shelfId) {
            setParentType('shelf');
            setSelectedTier2Id(folder.shelfId);
            const shelf = shelves.find(s => s.id === folder.shelfId);
            if (shelf) setSelectedTier1Id(shelf.cabinetId);
        }

        setDescription(folder.description || '');
        setColor(folder.color || '#FF6B6B');
        setIsEditDialogOpen(true);
    };

    const handleUpdate = async () => {
        if (!currentFolder || !name || !code) return;

        let parentId = '';
        if (parentType === 'shelf') {
            if (!selectedTier2Id) return;
            parentId = selectedTier2Id;
        } else {
            if (!selectedBoxId) return;
            parentId = selectedBoxId;
        }

        try {
            const updates: any = {
                name, code, description, color,
                shelfId: parentType === 'shelf' ? parentId : null,
                boxId: parentType === 'box' ? parentId : null,
            };

            const isOldShelf = !!currentFolder.shelfId;
            const isNewShelf = parentType === 'shelf';
            const oldParentId = currentFolder.shelfId || currentFolder.boxId;
            const hasParentChanged = (isOldShelf !== isNewShelf) || (oldParentId !== parentId);

            if (hasParentChanged) {
                const siblings = folders.filter(f => isNewShelf ? f.shelfId === parentId : f.boxId === parentId);
                updates.stackNumber = Math.max(...siblings.map(f => f.stackNumber || 0), 0) + 1;
            }

            await updateFolder(currentFolder.id, updates);
            setIsEditDialogOpen(false);
            resetForm();
            toast.success('Folder updated successfully');
        } catch (error) {
            toast.error('Failed to update folder');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteFolder(id);
            toast.success('Folder deleted successfully');
            if (selectedIds.includes(id)) setSelectedIds(prev => prev.filter(s => s !== id));
        } catch (error) {
            toast.error('Failed to delete folder');
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;
        const withContents = selectedIds.filter(id => getFolderStats(id).files > 0);
        if (withContents.length > 0) {
            toast.error(`Cannot delete ${withContents.length} folders because they contain items.`);
            return;
        }
        try {
            await Promise.all(selectedIds.map(id => deleteFolder(id)));
            toast.success(`${selectedIds.length} folders deleted successfully`);
            setSelectedIds([]);
            setIsBulkDeleteDialogOpen(false);
        } catch (error) {
            toast.error('Failed to delete some folders');
        }
    };

    const handleSelectAll = (checked: boolean) => {
        const currentIds = filteredFolders.map(c => c.id);
        if (checked) setSelectedIds(prev => Array.from(new Set([...prev, ...currentIds])));
        else setSelectedIds(prev => prev.filter(id => !currentIds.includes(id)));
    };

    const handleSelectOne = (id: string, checked: boolean) => {
        if (checked) setSelectedIds(prev => [...prev, id]);
        else setSelectedIds(prev => prev.filter(s => s !== id));
    };

    const handleViewFiles = (folderId: string) => navigate(`/procurement/list?folderId=${folderId}`);

    const handleRelocateClick = (folder: Folder) => {
        setRelocateFolder(folder);
        setNewStackNumber(folder.stackNumber || 0);
        setIsRelocateDialogOpen(true);
    };

    const handleRelocateConfirm = async () => {
        if (!relocateFolder) return;
        try {
            await updateFolder(relocateFolder.id, { stackNumber: newStackNumber });
            setIsRelocateDialogOpen(false);
            setRelocateFolder(null);
            toast.success(`Stack number updated to ${newStackNumber}`);
        } catch (error) {
            toast.error('Failed to update stack number');
        }
    };

    const getParentCabinetName = (shelfId: string): string => {
        const parentCabinet = shelves.find(s => s.id === shelfId);
        return parentCabinet ? `${parentCabinet.name} (${parentCabinet.code})` : 'Unknown';
    };

    const getParentShelfName = (shelfId: string): string => {
        const parentCabinet = shelves.find(s => s.id === shelfId);
        if (!parentCabinet) return 'Unknown';
        const parentShelf = cabinets.find(c => c.id === parentCabinet.cabinetId);
        return parentShelf ? `${parentShelf.name} (${parentShelf.code})` : 'Unknown';
    };

    const getFolderStats = (folderId: string) => ({
        files: procurements.filter(p => p.folderId === folderId).length
    });

    const filteredFolders = folders
        .filter(folder => {
            // Box filter takes priority — only show folders inside that box
            if (filterBoxId && filterBoxId !== 'all') {
                return folder.boxId === filterBoxId;
            }

            // If filtering by box, skip drawer/cabinet checks
            // Cabinet filter
            if (filterCabinetId && filterCabinetId !== 'all' && folder.shelfId !== filterCabinetId) {
                return false;
            }

            // Drawer filter
            if (filterTier1Id && filterTier1Id !== 'all') {
                const parentCabinet = shelves.find(s => s.id === folder.shelfId);
                if (!parentCabinet || parentCabinet.cabinetId !== filterTier1Id) return false;
            }

            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                return (
                    folder.name.toLowerCase().includes(q) ||
                    folder.code.toLowerCase().includes(q) ||
                    (folder.description && folder.description.toLowerCase().includes(q))
                );
            }
            return true;
        })
        .sort((a, b) => {
            let comparison = 0;
            if (sortField === 'name') {
                comparison = a.name.localeCompare(b.name);
            } else if (sortField === 'code') {
                const getNum = (s: string) => { const m = s.match(/\d+/); return m ? parseInt(m[0]) : 0; };
                const aNum = getNum(a.code), bNum = getNum(b.code);
                comparison = aNum === bNum ? a.code.localeCompare(b.code) : aNum - bNum;
            } else if (sortField === 'contents') {
                comparison = getFolderStats(a.id).files - getFolderStats(b.id).files;
            } else if (sortField === 'stackNumber') {
                comparison = (a.stackNumber || 0) - (b.stackNumber || 0);
            }
            return sortDirection === 'asc' ? comparison : -comparison;
        });

    // Active filter summary for display
    const activeBoxFilter = filterBoxId && filterBoxId !== 'all'
        ? boxes.find(b => b.id === filterBoxId)
        : null;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Folders</h1>
                    <p className="text-slate-400 mt-1">Manage folders within cabinets (Tier 3)</p>
                </div>
                <div className="flex gap-2">
                    {selectedIds.length > 0 && (
                        <AlertDialog open={isBulkDeleteDialogOpen} onOpenChange={setIsBulkDeleteDialogOpen}>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Selected ({selectedIds.length})
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-[#1e293b] border-slate-800 text-white">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete {selectedIds.length} Folders?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-slate-400">
                                        This action cannot be undone. This will permanently delete the selected folders.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-transparent border-slate-700 text-white hover:bg-slate-800">Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete All</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="mr-2 h-4 w-4" /> Add Folder
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#0f172a] border-slate-800 text-white s-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Add New Folder</DialogTitle>
                                <DialogDescription className="text-slate-400">Create a new folder inside a cabinet.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right text-slate-300">Location</Label>
                                    <div className="col-span-3 flex gap-2">
                                        <button type="button" onClick={() => setParentType('shelf')}
                                            className={`px-3 py-1 rounded text-sm transition-all ${parentType === 'shelf' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                                            Drawer &gt; Cabinet
                                        </button>
                                        <button type="button" onClick={() => setParentType('box')}
                                            className={`px-3 py-1 rounded text-sm transition-all ${parentType === 'box' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                                            Inside Box
                                        </button>
                                    </div>
                                </div>
                                {parentType === 'shelf' && (
                                    <>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right text-slate-300">Drawer</Label>
                                            <select value={selectedTier1Id} onChange={(e) => { setSelectedTier1Id(e.target.value); setSelectedTier2Id(''); setSelectedBoxId(''); }}
                                                className="col-span-3 bg-[#1e293b] border-slate-700 text-white rounded-md p-2">
                                                <option value="">Select Drawer</option>
                                                {cabinets.map(c => <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right text-slate-300">Parent Cabinet</Label>
                                            <select value={selectedTier2Id} onChange={(e) => { setSelectedTier2Id(e.target.value); setSelectedBoxId(''); }}
                                                className="col-span-3 bg-[#1e293b] border-slate-700 text-white rounded-md p-2" disabled={!selectedTier1Id}>
                                                <option value="">Select Cabinet</option>
                                                {shelves.filter(s => s.cabinetId === selectedTier1Id).map(s => <option key={s.id} value={s.id}>{s.name} ({s.code})</option>)}
                                            </select>
                                        </div>
                                    </>
                                )}
                                {parentType === 'box' && (
                                    <div className="grid grid-cols-4 items-center gap-4 animate-in fade-in">
                                        <Label className="text-right text-slate-300">Parent Box</Label>
                                        <select value={selectedBoxId} onChange={(e) => setSelectedBoxId(e.target.value)}
                                            className="col-span-3 bg-[#1e293b] border-slate-700 text-white rounded-md p-2">
                                            <option value="">Select Box</option>
                                            {boxes.map(b => <option key={b.id} value={b.id}>{b.name} ({b.code})</option>)}
                                        </select>
                                    </div>
                                )}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right text-slate-300">Name</Label>
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 bg-[#1e293b] border-slate-700 text-white" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="code" className="text-right text-slate-300">Code</Label>
                                    <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} className="col-span-3 bg-[#1e293b] border-slate-700 text-white" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="color" className="text-right text-slate-300">Color</Label>
                                    <div className="col-span-3 space-y-3">
                                        <div className="flex gap-2 flex-wrap">
                                            {DEFAULT_COLORS.map((c) => (
                                                <button key={c} type="button" onClick={() => setColor(c)}
                                                    className={`w-8 h-8 rounded-full border-2 transition-all ${color === c ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                                                    style={{ backgroundColor: c }} title={c} />
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Label htmlFor="custom-color" className="text-slate-400 text-sm">Custom:</Label>
                                            <div className="flex items-center gap-2 flex-1">
                                                <input id="custom-color" type="color" value={color} onChange={(e) => setColor(e.target.value)}
                                                    className="h-10 w-16 rounded border-2 border-slate-700 bg-[#1e293b] cursor-pointer" />
                                                <Input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="#FF6B6B"
                                                    className="flex-1 bg-[#1e293b] border-slate-700 text-white font-mono text-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="desc" className="text-right text-slate-300">Description</Label>
                                    <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3 bg-[#1e293b] border-slate-700 text-white" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-700 text-white hover:bg-slate-800">Cancel</Button>
                                <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">Save Folder</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Filter Bar */}
            <Card className="border-none bg-[#0f172a] shadow-lg">
                <CardContent className="p-4">
                    <div className="flex gap-3 items-center flex-wrap">
                        <Input
                            placeholder="Search folders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-[220px] bg-[#1e293b] border-slate-700 text-white"
                        />

                        <Label className="text-slate-400 text-xs whitespace-nowrap font-semibold uppercase tracking-wide">Filter:</Label>

                        {/* Drawer filter */}
                        <Select value={filterTier1Id} onValueChange={handleFilterTier1Change}>
                            <SelectTrigger className="w-[170px] bg-[#1e293b] border-slate-700 text-white">
                                <SelectValue placeholder="All Drawers" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1e293b] border-slate-700 text-white">
                                <SelectItem value="all">All Drawers</SelectItem>
                                {cabinets.map(c => (
                                    <SelectItem key={c.id} value={c.id}>{c.code} - {c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Cabinet filter */}
                        <Select value={filterCabinetId} onValueChange={handleFilterCabinetChange}>
                            <SelectTrigger className="w-[170px] bg-[#1e293b] border-slate-700 text-white">
                                <SelectValue placeholder="All Cabinets" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1e293b] border-slate-700 text-white">
                                <SelectItem value="all">All Cabinets</SelectItem>
                                {shelves
                                    .filter(s => !filterTier1Id || filterTier1Id === 'all' || s.cabinetId === filterTier1Id)
                                    .map(s => (
                                        <SelectItem key={s.id} value={s.id}>{s.code} - {s.name}</SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>

                        {/* ── NEW: Box filter ── */}
                        <Select value={filterBoxId} onValueChange={handleFilterBoxChange}>
                            <SelectTrigger className={`w-[170px] border-slate-700 text-white ${activeBoxFilter ? 'bg-amber-500/10 border-amber-500/40' : 'bg-[#1e293b]'}`}>
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <BoxIcon className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                                    <SelectValue placeholder="All Boxes" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-[#1e293b] border-slate-700 text-white">
                                <SelectItem value="all">All Boxes</SelectItem>
                                {boxes.map(b => (
                                    <SelectItem key={b.id} value={b.id}>
                                        {b.code} - {b.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Active box filter pill + clear */}
                        {activeBoxFilter && (
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-medium">
                                <BoxIcon className="h-3 w-3" />
                                {activeBoxFilter.code}
                                <button
                                    onClick={() => { setFilterBoxId(''); }}
                                    className="ml-0.5 hover:text-white transition-colors"
                                    title="Clear box filter"
                                >
                                    ×
                                </button>
                            </div>
                        )}

                        <Label className="text-slate-400 text-xs whitespace-nowrap font-semibold uppercase tracking-wide ml-1">Sort:</Label>
                        <Select value={sortField} onValueChange={(value) => setSortField(value as any)}>
                            <SelectTrigger className="w-[120px] bg-[#1e293b] border-slate-700 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1e293b] border-slate-700 text-white">
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="code">Code</SelectItem>
                                <SelectItem value="contents">Contents</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            variant="outline" size="sm"
                            onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                            className="bg-[#1e293b] border-slate-700 text-white hover:bg-slate-700"
                        >
                            {sortDirection === 'asc' ? '↑' : '↓'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none bg-[#0f172a] shadow-lg">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-800 hover:bg-transparent">
                                <TableHead className="w-[50px]">
                                    <Checkbox
                                        checked={filteredFolders.length > 0 && filteredFolders.every(c => selectedIds.includes(c.id))}
                                        onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                                        className="border-slate-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                    />
                                </TableHead>
                                <TableHead className="text-slate-300">Name</TableHead>
                                <TableHead className="text-slate-300">Parent Container</TableHead>
                                <TableHead className="text-slate-300">Code</TableHead>
                                <TableHead className="text-slate-300">Color</TableHead>
                                <TableHead className="text-center text-slate-300">Stack #</TableHead>
                                <TableHead className="text-slate-300">Contents</TableHead>
                                <TableHead className="text-right text-slate-300">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredFolders.length === 0 ? (
                                <TableRow className="border-slate-800">
                                    <TableCell colSpan={9} className="h-24 text-center text-slate-500">
                                        No folders found. Add your first folder.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredFolders.map((folder) => (
                                    <TableRow key={folder.id} className="border-slate-800 hover:bg-[#1e293b]">
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedIds.includes(folder.id)}
                                                onCheckedChange={(checked) => handleSelectOne(folder.id, checked as boolean)}
                                                className="border-slate-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold text-xs border border-white/20"
                                                    style={{ backgroundColor: folder.color || '#3b82f6' }}>
                                                    <FolderOpen className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{folder.name}</p>
                                                    <p className="text-xs text-slate-400">{folder.description || 'No description'}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-300">
                                            {folder.boxId ? (
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-slate-500">Box</span>
                                                    <span className="text-sm text-amber-400">
                                                        {(() => {
                                                            const box = boxes.find(b => b.id === folder.boxId);
                                                            return box ? `${box.name} (${box.code})` : 'Unknown Box';
                                                        })()}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-slate-400">{getParentShelfName(folder.shelfId)}</span>
                                                    <span className="text-sm">↳ {getParentCabinetName(folder.shelfId)}</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                                                {folder.code}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-12 rounded border-2 border-white/20" style={{ backgroundColor: folder.color || '#3b82f6' }} />
                                                <span className="text-xs text-slate-400 font-mono">{folder.color || '#3b82f6'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="text-slate-400 text-sm font-mono">
                                                {folder.stackNumber ? `↕${folder.stackNumber}` : '-'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-slate-300">
                                            {getFolderStats(folder.id).files} files
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleRelocateClick(folder)}
                                                    className="h-8 w-8 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10" title="Relocate / Reorder">
                                                    <ArrowUp className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => handleViewFiles(folder.id)}
                                                    className="h-8 bg-emerald-600/10 border-emerald-600/20 text-emerald-500 hover:bg-emerald-600/20 hover:text-emerald-400">
                                                    <Eye className="h-4 w-4 mr-1" /> View Files
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleEditClick(folder)}
                                                    className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className="bg-[#1e293b] border-slate-800 text-white">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete Folder?</AlertDialogTitle>
                                                            <AlertDialogDescription className="text-slate-400">
                                                                {(() => {
                                                                    const stats = getFolderStats(folder.id);
                                                                    if (stats.files > 0) {
                                                                        return (
                                                                            <div className="text-red-400 font-medium border border-red-400/20 bg-red-400/10 p-3 rounded-md">
                                                                                Cannot delete this folder.<br />
                                                                                It contains:<br />
                                                                                <ul className="list-disc list-inside mt-1 ml-2 text-sm">
                                                                                    <li><strong>{stats.files}</strong> File{stats.files !== 1 ? 's' : ''}</li>
                                                                                </ul>
                                                                                <br />Please delete all contents first.
                                                                            </div>
                                                                        );
                                                                    }
                                                                    return <span>This will permanently delete <strong>{folder.name}</strong>.</span>;
                                                                })()}
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel className="bg-transparent border-slate-700 text-white hover:bg-slate-800">Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(folder.id)}
                                                                disabled={getFolderStats(folder.id).files > 0}
                                                                className={getFolderStats(folder.id).files > 0
                                                                    ? "bg-slate-700 text-slate-400 cursor-not-allowed hover:bg-slate-700"
                                                                    : "bg-red-600 hover:bg-red-700 text-white"}
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Relocate Dialog */}
            <Dialog open={isRelocateDialogOpen} onOpenChange={setIsRelocateDialogOpen}>
                <DialogContent className="bg-[#0f172a] border-slate-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Relocate / Reorder Folder</DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Enter a new stack number for this folder to reorder it within its location.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="stackNumber" className="text-slate-300">New Stack Number (Value)</Label>
                        <Input id="stackNumber" type="number" value={newStackNumber}
                            onChange={(e) => setNewStackNumber(parseInt(e.target.value) || 0)}
                            className="bg-[#1e293b] border-slate-700 text-white mt-1.5" placeholder="Enter number..." />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRelocateDialogOpen(false)} className="border-slate-700 text-white hover:bg-slate-800">Cancel</Button>
                        <Button onClick={handleRelocateConfirm} className="bg-emerald-600 hover:bg-emerald-700 text-white">Update Position</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="bg-[#0f172a] border-slate-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Edit Folder</DialogTitle>
                        <DialogDescription className="text-slate-400">Update folder details.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right text-slate-300">Location</Label>
                            <div className="col-span-3 flex gap-2">
                                <button type="button" onClick={() => setParentType('shelf')}
                                    className={`px-3 py-1 rounded text-sm transition-all ${parentType === 'shelf' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                                    Drawer &gt; Cabinet
                                </button>
                                <button type="button" onClick={() => setParentType('box')}
                                    className={`px-3 py-1 rounded text-sm transition-all ${parentType === 'box' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                                    Inside Box
                                </button>
                            </div>
                        </div>
                        {parentType === 'shelf' && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right text-slate-300">Drawer</Label>
                                    <select value={selectedTier1Id} onChange={(e) => { setSelectedTier1Id(e.target.value); setSelectedTier2Id(''); setSelectedBoxId(''); }}
                                        className="col-span-3 bg-[#1e293b] border-slate-700 text-white rounded-md p-2">
                                        <option value="">Select Drawer</option>
                                        {cabinets.map(c => <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right text-slate-300">Parent Cabinet</Label>
                                    <select value={selectedTier2Id} onChange={(e) => { setSelectedTier2Id(e.target.value); setSelectedBoxId(''); }}
                                        className="col-span-3 bg-[#1e293b] border-slate-700 text-white rounded-md p-2" disabled={!selectedTier1Id}>
                                        <option value="">Select Cabinet</option>
                                        {shelves.filter(s => s.cabinetId === selectedTier1Id).map(s => <option key={s.id} value={s.id}>{s.name} ({s.code})</option>)}
                                    </select>
                                </div>
                            </>
                        )}
                        {parentType === 'box' && (
                            <div className="grid grid-cols-4 items-center gap-4 animate-in fade-in">
                                <Label className="text-right text-slate-300">Parent Box</Label>
                                <select value={selectedBoxId} onChange={(e) => setSelectedBoxId(e.target.value)}
                                    className="col-span-3 bg-[#1e293b] border-slate-700 text-white rounded-md p-2">
                                    <option value="">Select Box</option>
                                    {boxes.map(b => <option key={b.id} value={b.id}>{b.name} ({b.code})</option>)}
                                </select>
                            </div>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right text-slate-300">Name</Label>
                            <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 bg-[#1e293b] border-slate-700 text-white" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-code" className="text-right text-slate-300">Code</Label>
                            <Input id="edit-code" value={code} onChange={(e) => setCode(e.target.value)} className="col-span-3 bg-[#1e293b] border-slate-700 text-white" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-color" className="text-right text-slate-300">Color</Label>
                            <div className="col-span-3 space-y-3">
                                <div className="flex gap-2 flex-wrap">
                                    {DEFAULT_COLORS.map((c) => (
                                        <button key={c} type="button" onClick={() => setColor(c)}
                                            className={`w-8 h-8 rounded-full border-2 transition-all ${color === c ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                                            style={{ backgroundColor: c }} title={c} />
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="edit-custom-color" className="text-slate-400 text-sm">Custom:</Label>
                                    <div className="flex items-center gap-2 flex-1">
                                        <input id="edit-custom-color" type="color" value={color} onChange={(e) => setColor(e.target.value)}
                                            className="h-10 w-16 rounded border-2 border-slate-700 bg-[#1e293b] cursor-pointer" />
                                        <Input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="#FF6B6B"
                                            className="flex-1 bg-[#1e293b] border-slate-700 text-white font-mono text-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-desc" className="text-right text-slate-300">Description</Label>
                            <Textarea id="edit-desc" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3 bg-[#1e293b] border-slate-700 text-white" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-slate-700 text-white hover:bg-slate-800">Cancel</Button>
                        <Button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Folders;