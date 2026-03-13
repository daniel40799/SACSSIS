// @ts-nocheck
/**
 * ComponentLibrary — a browsable index of all 693 migrated react-refactor components.
 *
 * Usage: Import and render <ComponentLibrary /> in your router/demo.
 */
import React, { useState } from 'react';

// ── generic wrappers ──────────────────────────────────────────────────────
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Tabs } from '../components/navigation/Tabs';
import { Alert } from '../components/feedback/Alert';

// ── application-ui samples ────────────────────────────────────────────────
import { DescriptionList } from '../components/application-ui/data-display/description-lists/DescriptionList';
import { StatsInCards } from '../components/application-ui/data-display/stats/StatsInCards';
import { PrimaryButton } from '../components/application-ui/elements/buttons/PrimaryButton';
import { FlatBadge } from '../components/application-ui/elements/badges/FlatBadge';
import { PillBadge } from '../components/application-ui/elements/badges/PillBadge';
import { Toggle } from '../components/application-ui/forms/toggles/Toggle';
import { Combobox } from '../components/application-ui/forms/comboboxes/Combobox';
import { AlertWithDescription } from '../components/application-ui/feedback/alerts/AlertWithDescription';
import { EmptyState } from '../components/application-ui/feedback/empty-states/EmptyState';
import { ProgressBar } from '../components/application-ui/navigation/progress-bars/ProgressBar';
import { UnderlineTabs } from '../components/application-ui/navigation/tabs/UnderlineTabs';
import { BreadcrumbWithChevrons } from '../components/application-ui/navigation/breadcrumbs/BreadcrumbWithChevrons';
import { CenteredPagination } from '../components/application-ui/navigation/pagination/CenteredPagination';
import { StackedListsComponent } from '../components/application-ui/lists/stacked-lists/StackedListsComponent';
import { BasicCard } from '../components/application-ui/layout/cards/BasicCard';
import { CardWithHeader } from '../components/application-ui/layout/cards/CardWithHeader';
import { CardWithFooter } from '../components/application-ui/layout/cards/CardWithFooter';
import { SimpleWithIcons } from '../components/application-ui/lists/feeds/SimpleWithIcons';

// ── ecommerce samples ─────────────────────────────────────────────────────
import { ProductList } from '../components/ecommerce/components/product-lists/ProductList';
import { AvatarReviews } from '../components/ecommerce/components/reviews/AvatarReviews';
import { ThreeColumnIconIncentives } from '../components/ecommerce/components/incentives/ThreeColumnIconIncentives';
import { ThreeColumnCategoryPreview } from '../components/ecommerce/components/category-previews/ThreeColumnCategoryPreview';

// ── marketing samples ─────────────────────────────────────────────────────
import { CenteredHero } from '../components/marketing/sections/heroes/CenteredHero';
import { ThreeTierPricing } from '../components/marketing/sections/pricing/ThreeTierPricing';
import { FourColumnFooter } from '../components/marketing/sections/footers/FourColumnFooter';
import { FaqAccordion } from '../components/marketing/sections/faq-sections/FaqAccordion';
import { FeatureSectionsComponent } from '../components/marketing/sections/feature-sections/FeatureSectionsComponent';
import { BannerWithLink } from '../components/marketing/elements/banners/BannerWithLink';
import { LogoCloud } from '../components/marketing/sections/logo-clouds/LogoCloud';
import { CenteredTestimonial } from '../components/marketing/sections/testimonials/CenteredTestimonial';
import { StatsSectionsComponent } from '../components/marketing/sections/stats-sections/StatsSectionsComponent';
import { NotFoundPage } from '../components/marketing/feedback/404-pages/NotFoundPage';

// ── section catalog ───────────────────────────────────────────────────────

const CATALOG = {
  'Application UI': {
    color: 'indigo',
    total: 380,
    sections: {
      'Application Shells': '23 layout shell variants (sidebar, stacked, multi-column)',
      'Data Display': '13 variants — calendars, description lists, stat cards',
      'Elements': '56 primitives — avatars, badges, buttons, button-groups, dropdowns',
      'Feedback': '9 alerts + 6 empty-state variants',
      'Forms': '65+ components — checkboxes, comboboxes, inputs, radio, select, toggles, textareas, sign-in forms, action panels, form layouts',
      'Headings': '22 card/page/section heading variants',
      'Layout': '38 cards, containers, dividers, list-containers, media-objects',
      'Lists': '41 feeds, grid-lists, stacked-lists, table variants',
      'Navigation': '53 breadcrumbs, command-palettes, navbars, pagination, progress-bars, sidebar-nav, tabs, vertical-nav',
      'Overlays': '18 drawers, modal dialogs, notifications/toasts',
      'Page Examples': '6 full-page layouts (detail, home, settings screens)',
    },
  },
  'Ecommerce': {
    color: 'emerald',
    total: 114,
    sections: {
      'Category Filters': '5 filter panel/sidebar variants',
      'Category Previews': '6 category grid/scroll preview variants',
      'Checkout Forms': '5 checkout form variants',
      'Incentives': '7 incentive/perks banner variants',
      'Order History': '4 order history list variants',
      'Order Summaries': '4 order summary panel variants',
      'Product Features': '9 feature highlight variants',
      'Product Lists': '11 product grid/list variants',
      'Product Overviews': '5 product detail overview variants',
      'Product Quickviews': '4 quick-view modal variants',
      'Promo Sections': '8 promotional banner/section variants',
      'Reviews': '4 review list variants',
      'Shopping Carts': '6 cart UI variants',
      'Store Navigation': '5 store nav/header variants',
      'Page Examples': '32 full ecommerce page layouts',
    },
  },
  'Marketing': {
    color: 'pink',
    total: 199,
    sections: {
      'Banners': '13 announcement/cookie/promo banner variants',
      'Flyout Menus': '7 mega-menu flyout variants',
      'Headers': '12 site header variants',
      'Blog Sections': '7 blog listing section variants',
      'Contact Sections': '8 contact form/section variants',
      'Content Sections': '6 content block section variants',
      'CTA Sections': '11 call-to-action section variants',
      'FAQ Sections': '10 FAQ accordion/grid variants',
      'Feature Sections': '20 feature highlight section variants',
      'Footers': '10 footer variants',
      'Page Headers': '10 page hero/header section variants',
      'Heroes': '12 hero section variants',
      'Logo Clouds': '12 logo grid/cloud variants',
      'Newsletter Sections': '7 newsletter subscribe section variants',
      'Pricing': '13 pricing table variants',
      'Stats Sections': '10 statistics/metrics section variants',
      'Team Sections': '9 team member grid variants',
      'Testimonials': '9 testimonial section variants',
      'Feedback (404)': '5 error/not-found page variants',
      'Page Examples': '10 full marketing page layouts',
    },
  },
};

const borderColorMap: Record<string, string> = {
  indigo: 'border-l-4 border-indigo-300 bg-indigo-50',
  emerald: 'border-l-4 border-emerald-300 bg-emerald-50',
  pink: 'border-l-4 border-pink-300 bg-pink-50',
};

const badgeColorMap: Record<string, string> = {
  indigo: 'indigo',
  emerald: 'green',
  pink: 'pink',
};

type DemoKey = 'app-ui' | 'ecommerce' | 'marketing';

export function ComponentLibrary() {
  const [activeDemo, setActiveDemo] = useState<DemoKey>('app-ui');

  const tabs = [
    { name: 'App UI Demos', current: activeDemo === 'app-ui' },
    { name: 'Ecommerce Demos', current: activeDemo === 'ecommerce' },
    { name: 'Marketing Demos', current: activeDemo === 'marketing' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Component Library</h1>
              <p className="mt-1 text-sm text-gray-500">
                All 693 migrated components from{' '}
                <code className="font-mono bg-gray-100 px-1 rounded">react-refactor</code> —
                organized into <strong>application-ui</strong>, <strong>ecommerce</strong>, and{' '}
                <strong>marketing</strong> sections.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge color="indigo">380 App UI</Badge>
              <Badge color="green">114 Ecommerce</Badge>
              <Badge color="pink">199 Marketing</Badge>
              <Badge color="gray">693 Total</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert
          variant="info"
          title="Full component catalog"
          message="Each section lists categories and variant counts. Use the tabs below to see live demos. Import any component directly via its path or through the namespace exports (applicationUI, ecommerce, marketing) from components/index.ts."
        />

        {/* ── Catalog Grid ── */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {Object.entries(CATALOG).map(([sectionName, { color, total, sections }]) => (
            <Card
              key={sectionName}
              header={
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">{sectionName}</h3>
                  <Badge color={badgeColorMap[color] as any}>{total} components</Badge>
                </div>
              }
              padding={false}
            >
              <ul className="divide-y divide-gray-100">
                {Object.entries(sections).map(([cat, desc]) => (
                  <li key={cat} className={`px-4 py-3 ${borderColorMap[color]}`}>
                    <p className="text-sm font-medium text-gray-800">{cat}</p>
                    <p className="text-xs mt-0.5 text-gray-500">{desc}</p>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* ── Live Demos ── */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Live Component Demos</h2>
          <Tabs
            tabs={tabs}
            onChange={(tab) => {
              if (tab.name.startsWith('App')) setActiveDemo('app-ui');
              else if (tab.name.startsWith('Ecommerce')) setActiveDemo('ecommerce');
              else setActiveDemo('marketing');
            }}
          />

          <div className="mt-6 space-y-10">
            {activeDemo === 'app-ui' && <AppUIDemos />}
            {activeDemo === 'ecommerce' && <EcommerceDemos />}
            {activeDemo === 'marketing' && <MarketingDemos />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Demo Sections ─────────────────────────────────────────────────────────

function DemoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        {title}
      </h3>
      <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

function AppUIDemos() {
  return (
    <div className="space-y-8">
      <DemoSection title="Stats in Cards">
        <StatsInCards />
      </DemoSection>
      <DemoSection title="Description List">
        <DescriptionList />
      </DemoSection>
      <DemoSection title="Stacked List">
        <StackedListsComponent
          people={[
            {
              name: 'Leslie Alexander',
              email: 'leslie.alexander@example.com',
              role: 'Co-Founder / CEO',
              imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=facearea&facepad=2&q=80',
              lastSeen: '3h ago',
              lastSeenDateTime: '2023-01-23T13:23Z',
            },
            {
              name: 'Michael Foster',
              email: 'michael.foster@example.com',
              role: 'Co-Founder / CTO',
              imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=256&h=256&fit=facearea&facepad=2&q=80',
              lastSeen: '',
              lastSeenDateTime: '',
            },
          ]}
        />
      </DemoSection>
      <DemoSection title="Breadcrumb + Pagination">
        <div className="space-y-6">
          <BreadcrumbWithChevrons
            pages={[
              { name: 'Projects', href: '#', current: false },
              { name: 'Project Nero', href: '#', current: true },
            ]}
          />
          <CenteredPagination />
        </div>
      </DemoSection>
      <DemoSection title="Progress Bar">
        <ProgressBar />
      </DemoSection>
      <DemoSection title="Tabs (Underline)">
        <UnderlineTabs />
      </DemoSection>
      <DemoSection title="Alert with Description">
        <AlertWithDescription />
      </DemoSection>
      <DemoSection title="Empty State">
        <EmptyState />
      </DemoSection>
      <DemoSection title="Buttons & Badges">
        <div className="flex flex-wrap items-center gap-3">
          <PrimaryButton />
          <FlatBadge />
          <PillBadge />
        </div>
      </DemoSection>
      <DemoSection title="Toggle">
        <Toggle />
      </DemoSection>
      <DemoSection title="Combobox">
        <Combobox />
      </DemoSection>
      <DemoSection title="Layout Cards">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <BasicCard />
          <CardWithHeader />
          <CardWithFooter />
        </div>
      </DemoSection>
      <DemoSection title="Activity Feed">
        <SimpleWithIcons />
      </DemoSection>
    </div>
  );
}

function EcommerceDemos() {
  return (
    <div className="space-y-8">
      <DemoSection title="Product List">
        <ProductList
          products={[
            {
              id: 1,
              name: 'Basic Tee 6-Pack',
              href: '#',
              price: '$192',
              imageSrc:
                'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
              imageAlt: 'Six shirts.',
            },
            {
              id: 2,
              name: 'Basic Tee',
              href: '#',
              price: '$32',
              imageSrc:
                'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
              imageAlt: 'Front of tee.',
            },
            {
              id: 3,
              name: 'Artwork Tee',
              href: '#',
              price: '$32',
              imageSrc:
                'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg',
              imageAlt: 'Front of artwork tee.',
            },
          ]}
        />
      </DemoSection>
      <DemoSection title="Category Previews (Three Column)">
        <ThreeColumnCategoryPreview />
      </DemoSection>
      <DemoSection title="Incentives">
        <ThreeColumnIconIncentives />
      </DemoSection>
      <DemoSection title="Customer Reviews">
        <AvatarReviews />
      </DemoSection>
    </div>
  );
}

function MarketingDemos() {
  return (
    <div className="space-y-8">
      <DemoSection title="Hero — Centered">
        <CenteredHero />
      </DemoSection>
      <DemoSection title="Feature Sections">
        <FeatureSectionsComponent />
      </DemoSection>
      <DemoSection title="Stats Section">
        <StatsSectionsComponent />
      </DemoSection>
      <DemoSection title="Logo Cloud">
        <LogoCloud />
      </DemoSection>
      <DemoSection title="Testimonial — Centered">
        <CenteredTestimonial />
      </DemoSection>
      <DemoSection title="Pricing — Three Tiers">
        <ThreeTierPricing />
      </DemoSection>
      <DemoSection title="FAQ Accordion">
        <FaqAccordion />
      </DemoSection>
      <DemoSection title="Banner with Link">
        <BannerWithLink />
      </DemoSection>
      <DemoSection title="Footer — Four Column">
        <FourColumnFooter />
      </DemoSection>
      <DemoSection title="404 Not Found Page">
        <NotFoundPage />
      </DemoSection>
    </div>
  );
}

export default ComponentLibrary;
