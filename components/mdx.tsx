import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Cards as FdCards, Card as FdCard } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';
import { Steps as FdSteps, Step as FdStep } from 'fumadocs-ui/components/steps';
import { Accordions, Accordion as FdAccordion } from 'fumadocs-ui/components/accordion';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';
import { Icon } from './icon';

// The content was written for Mintlify. These wrappers keep its component
// names and props working on Fumadocs, so pages don't need rewriting.

const GRID_COLS: Record<number, string> = {
  1: 'grid-cols-1',
  2: '@max-lg:grid-cols-1 grid-cols-2',
  3: '@max-lg:grid-cols-1 grid-cols-2 lg:grid-cols-3',
  4: '@max-lg:grid-cols-1 grid-cols-2 lg:grid-cols-4',
};

function CardGroup({ cols = 2, children }: { cols?: number; children?: ReactNode }) {
  return <FdCards className={GRID_COLS[cols] ?? GRID_COLS[2]}>{children}</FdCards>;
}

export function Card({
  title,
  icon,
  href,
  children,
}: {
  title: string;
  icon?: string;
  href?: string;
  children?: ReactNode;
}) {
  return (
    <FdCard title={title} icon={<Icon name={icon} />} href={href}>
      {children}
    </FdCard>
  );
}

function Steps({ children }: { children?: ReactNode }) {
  return <FdSteps>{children}</FdSteps>;
}

function Step({ title, children }: { title?: string; children?: ReactNode }) {
  return (
    <FdStep>
      {title && <p className="font-semibold !mt-0">{title}</p>}
      {children}
    </FdStep>
  );
}

function AccordionGroup({ children }: { children?: ReactNode }) {
  return <Accordions multiple>{children}</Accordions>;
}

function Accordion({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: string;
  children?: ReactNode;
}) {
  return (
    <FdAccordion
      value={title}
      title={
        icon ? (
          <span className="inline-flex items-center gap-2">
            <Icon name={icon} />
            {title}
          </span>
        ) : (
          title
        )
      }
    >
      {children}
    </FdAccordion>
  );
}

const Note = ({ children }: { children?: ReactNode }) => <Callout type="info">{children}</Callout>;
const Info = ({ children }: { children?: ReactNode }) => <Callout type="info">{children}</Callout>;
const Tip = ({ children }: { children?: ReactNode }) => <Callout type="idea">{children}</Callout>;
const Warning = ({ children }: { children?: ReactNode }) => <Callout type="warning">{children}</Callout>;

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    CardGroup,
    Card,
    Steps,
    Step,
    AccordionGroup,
    Accordion,
    Tabs,
    Tab,
    Note,
    Info,
    Tip,
    Warning,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
