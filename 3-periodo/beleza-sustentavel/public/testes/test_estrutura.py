import os
import unittest
from html.parser import HTMLParser

class EstruturaParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.scripts = []
        self.semantic_tags = set()

    def handle_starttag(self, tag, attrs):
        self.tags.append(tag)
        if tag in ['header', 'nav', 'main', 'section', 'footer']:
            self.semantic_tags.add(tag)
        if tag == 'script':
            attr_dict = dict(attrs)
            if 'src' in attr_dict:
                self.scripts.append(attr_dict['src'])

class TestEstrutura(unittest.TestCase):
    def setUp(self):
        # Como o teste está em public/testes/, a pasta base (public) está um nível acima (..)
        self.base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        self.html_files = [
            "index.html",
            "ambiental.html",
            "social.html",
            "economica.html",
            "tutorial.html"
        ]

    def test_arquivos_existem(self):
        for f in self.html_files:
            path = os.path.join(self.base_dir, f)
            self.assertTrue(os.path.exists(path), f"Arquivo não encontrado: {path}")

    def test_tags_semanticas(self):
        for f in self.html_files:
            path = os.path.join(self.base_dir, f)
            if not os.path.exists(path):
                continue
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            parser = EstruturaParser()
            parser.feed(content)
            
            self.assertIn("header", parser.semantic_tags, f"{f} está sem a tag <header>")
            self.assertIn("nav", parser.semantic_tags, f"{f} está sem a tag <nav>")
            self.assertIn("main", parser.semantic_tags, f"{f} está sem a tag <main>")
            self.assertIn("footer", parser.semantic_tags, f"{f} está sem a tag <footer>")

    def test_ordem_scripts(self):
        for f in self.html_files:
            path = os.path.join(self.base_dir, f)
            if not os.path.exists(path):
                continue
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            parser = EstruturaParser()
            parser.feed(content)
            
            scripts = parser.scripts
            if len(scripts) >= 2:
                tailwind_idx = -1
                script_js_idx = -1
                for i, src in enumerate(scripts):
                    if "tailwindcss.com" in src:
                        tailwind_idx = i
                    elif "script.js" in src:
                        script_js_idx = i
                
                if tailwind_idx != -1 and script_js_idx != -1:
                    self.assertLess(
                        tailwind_idx, 
                        script_js_idx, 
                        f"No arquivo {f}, o Tailwind CDN deve ser carregado ANTES de script.js"
                    )

if __name__ == "__main__":
    unittest.main()
