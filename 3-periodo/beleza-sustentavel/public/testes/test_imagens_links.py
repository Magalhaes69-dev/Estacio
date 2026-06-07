import os
import unittest
from html.parser import HTMLParser
from urllib.parse import urlparse

class LinksImagensParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.images = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if tag == 'a':
            href = attr_dict.get('href')
            if href:
                self.links.append(href)
        elif tag == 'img':
            src = attr_dict.get('src')
            if src:
                self.images.append(src)

class TestImagensLinks(unittest.TestCase):
    def setUp(self):
        self.base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        self.html_files = [
            "index.html",
            "ambiental.html",
            "social.html",
            "economica.html",
            "tutorial.html"
        ]

    def test_existencia_de_imagens(self):
        for f in self.html_files:
            path = os.path.join(self.base_dir, f)
            if not os.path.exists(path):
                continue
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            parser = LinksImagensParser()
            parser.feed(content)
            
            for img_src in parser.images:
                if img_src.startswith("http://") or img_src.startswith("https://") or img_src.startswith("//"):
                    continue
                
                clean_src = urlparse(img_src).path
                if not clean_src:
                    continue
                
                img_path = os.path.join(self.base_dir, clean_src)
                self.assertTrue(
                    os.path.exists(img_path),
                    f"No arquivo {f}, a imagem não existe no disco: {img_src} (caminho resolvido: {img_path})"
                )

    def test_integridade_dos_links_locais(self):
        for f in self.html_files:
            path = os.path.join(self.base_dir, f)
            if not os.path.exists(path):
                continue
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            parser = LinksImagensParser()
            parser.feed(content)
            
            for href in parser.links:
                if (href.startswith("http://") or href.startswith("https://") or 
                    href.startswith("#") or href.startswith("javascript:") or 
                    href.startswith("mailto:") or href.startswith("tel:")):
                    continue
                
                parsed_url = urlparse(href)
                link_path = parsed_url.path
                
                if not link_path:
                    continue
                
                resolved_path = os.path.join(self.base_dir, link_path)
                self.assertTrue(
                    os.path.exists(resolved_path),
                    f"No arquivo {f}, o link local aponta para um arquivo inexistente: {href} (caminho resolvido: {resolved_path})"
                )

    def test_existencia_arquivos_markdown(self):
        markdown_files = [
            "autor.md",
            "readme.md",
            "tutoriais/ambiental.md",
            "tutoriais/economica.md",
            "tutoriais/social.md"
        ]
        for md in markdown_files:
            md_path = os.path.join(self.base_dir, md)
            self.assertTrue(
                os.path.exists(md_path),
                f"Arquivo Markdown necessário não encontrado: {md_path}"
            )

if __name__ == "__main__":
    unittest.main()
