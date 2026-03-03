import { FileCarousel, type FileData } from 'react-file-carousel';

const tailwindClassNames = {
  root: 'rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden',
  bar: 'bg-slate-50 border-slate-200',
  tab: 'rounded-lg px-3 py-2 hover:bg-slate-100 border-slate-200 text-slate-600',
  tabActive: 'bg-blue-100 border-blue-400 text-blue-800 font-medium',
  name: 'text-sm truncate max-w-[6rem]',
  preview: 'bg-white p-4',
  table: 'min-w-full divide-y divide-slate-200 text-sm',
  tableHeaderCell: 'px-4 py-2 text-left font-medium text-slate-500 bg-slate-50',
  tableCell: 'px-4 py-2 text-slate-700',
  pre: 'p-4 text-sm font-mono text-slate-800 overflow-auto',
  code: 'text-slate-800',
};

export function TailwindExample({ files }: { files: FileData[] }) {
  return (
    <div className="h-[380px]">
      <FileCarousel files={files} classNames={tailwindClassNames} />
    </div>
  );
}
