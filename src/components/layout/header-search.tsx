import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Search,
  LayoutDashboard,
  CheckSquare,
  Users,
  Shield,
  FileText,
  Settings,
  Plus,
} from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { usePermissions } from '@/hooks/use-permissions';
import { useDebounce } from '@/hooks/use-debounce';
import { ROUTES } from '@/lib/constants';

type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  module: string;
};

const navigationActions = [
  { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.DASHBOARD },
  { label: 'Todos', icon: CheckSquare, path: ROUTES.TODOS, permission: 'todos.read' },
  { label: 'Users', icon: Users, path: ROUTES.USERS, permission: 'users.read' },
  { label: 'Roles', icon: Shield, path: ROUTES.ROLES, permission: 'roles.read' },
  { label: 'Audit Logs', icon: FileText, path: ROUTES.AUDITS, permission: 'audits.read' },
  { label: 'Settings', icon: Settings, path: ROUTES.SETTINGS },
];

const createActions = [
  { label: 'Create Todo', icon: Plus, path: ROUTES.TODOS, permission: 'todos.create' },
  { label: 'Create User', icon: Plus, path: ROUTES.USERS, permission: 'users.create' },
  { label: 'Create Role', icon: Plus, path: ROUTES.ROLES, permission: 'roles.create' },
];

export const HeaderSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();

  // Cmd+K / Ctrl+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Search API call (placeholder)
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // TODO: Replace with actual API call
    // searchService.globalSearch(debouncedQuery).then((data) => {
    //   setResults(data);
    //   setIsSearching(false);
    // });
    const timer = setTimeout(() => {
      setResults([]);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  const handleSelect = (path: string) => {
    setOpen(false);
    setQuery('');
    navigate(path);
  };

  const hasQuery = query.trim().length > 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative flex h-9 w-full max-w-md items-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground shadow-xs hover:bg-accent/50 transition-colors"
      >
        <Search className="size-4 shrink-0" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="pointer-events-none hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) setQuery('');
        }}
        showCloseButton={false}
      >
        <CommandInput
          placeholder="Search..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="min-h-75">
          {hasQuery ? (
            isSearching ? (
              <div className="p-2 space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full rounded-sm" />
                ))}
              </div>
            ) : results.length > 0 ? (
              <CommandGroup heading="Results">
                {results.map((result) => (
                  <CommandItem
                    key={result.id}
                    value={result.title}
                    onSelect={() => handleSelect(`/${result.module}/${result.id}`)}
                  >
                    <span>{result.title}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{result.subtitle}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>No results found.</CommandEmpty>
            )
          ) : (
            <>
              <CommandGroup heading="Pages">
                {navigationActions
                  .filter((a) => !a.permission || hasPermission(a.permission))
                  .map((action) => (
                    <CommandItem
                      key={action.path}
                      value={action.label}
                      onSelect={() => handleSelect(action.path)}
                    >
                      <action.icon />
                      <span>{action.label}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Quick Actions">
                {createActions
                  .filter((a) => !a.permission || hasPermission(a.permission))
                  .map((action) => (
                    <CommandItem
                      key={action.label}
                      value={action.label}
                      onSelect={() => handleSelect(action.path)}
                    >
                      <action.icon />
                      <span>{action.label}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
