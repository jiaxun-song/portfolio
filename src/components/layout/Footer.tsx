import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="relative z-10 border-t border-border py-12 px-6 md:px-16">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-muted">
          {t('copyright')}
        </p>
        <div className="flex items-center gap-8">
          <a
            href="https://www.behance.net/zx98979897d9dd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300"
          >
            Behance
          </a>
          <a
            href="https://drive.google.com/drive/u/5/folders/1jTFXeVDkk5sfFede1RY9_F6DIogl7pvu?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
