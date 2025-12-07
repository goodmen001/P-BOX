import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useSidebar } from './Layout'
import { useThemeStore } from '@/stores/themeStore'
import { useProxyStore } from '@/stores/proxyStore'
import {
  LayoutDashboard,
  Globe,
  ListTree,
  Link2,
  FileCode,
  Settings,
  ArrowLeftRight,
  FileText,
  Database,
  X,
  Cpu,
  Github,
  ExternalLink,
  SlidersHorizontal,
} from 'lucide-react'

// Navigation groups
const mainNavItems = [
  { path: '/', icon: LayoutDashboard, labelKey: 'nav.dashboard', color: 'blue' },
  { path: '/proxy-switch', icon: ArrowLeftRight, labelKey: 'nav.proxySwitch', color: 'purple' },
  { path: '/nodes', icon: Globe, labelKey: 'nav.nodes', color: 'cyan' },
  { path: '/connections', icon: Link2, labelKey: 'nav.connections', color: 'teal' },
  { path: '/subscriptions', icon: ListTree, labelKey: 'nav.subscriptions', color: 'green' },
  { path: '/config-generator', icon: FileCode, labelKey: 'nav.configGenerator', color: 'orange' },
  { path: '/ruleset', icon: Database, labelKey: 'nav.ruleset', color: 'pink' },
]

const systemNavItems = [
  { path: '/core-manage', icon: Cpu, labelKey: 'nav.coreManage', color: 'red' },
  { path: '/proxy-settings', icon: SlidersHorizontal, labelKey: 'nav.proxySettings', color: 'indigo' },
  { path: '/logs', icon: FileText, labelKey: 'nav.logs', color: 'yellow' },
  { path: '/settings', icon: Settings, labelKey: 'nav.settings', color: 'rose' },
]

const APP_VERSION = '1.0'
const GITHUB_URL = 'https://github.com/star8618/P-BOX'

export default function Sidebar() {
  const location = useLocation()
  const { t } = useTranslation()
  const { isOpen, close } = useSidebar()
  const { themeStyle } = useThemeStore()
  const { isRunning, fetchStatus } = useProxyStore()

  // 获取代理状态
  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 5000)
    return () => clearInterval(interval)
  }, [fetchStatus])

  // 根据代理状态过滤导航项
  const filteredMainNavItems = mainNavItems.filter(item => {
    // 代理切换只有在运行时显示
    if (item.path === '/proxy-switch') return isRunning
    return true
  })

  const renderNavItems = (items: typeof mainNavItems) => (
    <div className="space-y-0.5">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path

        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={close}
            className={cn('nav-item group', isActive && 'active')}
          >
            <div className={cn('app-icon', item.color, 'scale-90 group-hover:scale-100 transition-transform')}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium truncate">{t(item.labelKey)}</span>
          </Link>
        )
      })}
    </div>
  )

  return (
    <aside className={cn(
      'sidebar w-64 flex-shrink-0 flex flex-col justify-between z-50',
      'fixed inset-y-0 left-0 transform transition-transform duration-300 lg:relative lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    )}>
      <div>
        {/* Logo */}
        <div className={cn(
          'p-6 border-b',
          themeStyle === 'apple-glass' ? 'border-black/5' : 'border-white/5'
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-10 h-10 rounded-[10px] flex items-center justify-center shadow-lg overflow-hidden',
                themeStyle === 'apple-glass' 
                  ? 'bg-gradient-to-br from-slate-100 to-white border border-black/5' 
                  : 'bg-black border border-purple-500/20'
              )}>
                <img src="/p-box-logo.png" alt="P-BOX" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h1 className={cn(
                  'text-lg font-bold tracking-widest leading-none',
                  themeStyle === 'apple-glass' ? 'text-slate-800' : 'text-white'
                )}>
                  P-BOX
                  <span className={cn(
                    'text-xs font-normal ml-1',
                    themeStyle === 'apple-glass' ? 'text-slate-500' : 'text-slate-500'
                  )}>PRO</span>
                </h1>
              </div>
            </div>
            {/* Mobile close button */}
            <button 
              onClick={close}
              className={cn(
                'p-2 rounded-lg lg:hidden',
                themeStyle === 'apple-glass' 
                  ? 'hover:bg-black/5 text-slate-500' 
                  : 'hover:bg-white/10 text-slate-400'
              )}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation menu */}
        <div className="px-3 py-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
          <div>
            <div className="px-2 pb-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider">Main Module</div>
            {renderNavItems(filteredMainNavItems)}
          </div>
          
          <div>
            <div className="px-2 pb-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider">System</div>
            {renderNavItems(systemNavItems)}
          </div>
        </div>
      </div>

      {/* Version & GitHub */}
      <div className={cn(
        'p-4 border-t',
        themeStyle === 'apple-glass' ? 'border-black/5 bg-white/20' : 'border-white/5 bg-black/20'
      )}>
        <div className={cn(
          'rounded-lg p-3 border',
          themeStyle === 'apple-glass' ? 'bg-white/40 border-white/20' : 'bg-white/5 border-white/5'
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden',
                themeStyle === 'apple-glass' 
                  ? 'bg-gradient-to-br from-slate-100 to-white border border-black/5' 
                  : 'bg-black border border-purple-500/20'
              )}>
                <img src="/p-box-logo.png" alt="P-BOX" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <div className={cn(
                  'text-xs font-semibold',
                  themeStyle === 'apple-glass' ? 'text-slate-700' : 'text-white'
                )}>P-BOX</div>
                <div className="text-[10px] text-slate-500 font-mono">v{APP_VERSION}</div>
              </div>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors',
                themeStyle === 'apple-glass'
                  ? 'hover:bg-black/5 text-slate-600'
                  : 'hover:bg-white/10 text-slate-400'
              )}
            >
              <Github className="w-4 h-4" />
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}
