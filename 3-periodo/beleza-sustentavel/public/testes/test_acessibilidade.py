import os
import unittest
from html.parser import HTMLParser

class AcessibilidadeParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.images_without_alt = []
        self.buttons_without_accessible_name = []
        self.inputs_without_label = []
        self.current_tag = None
        self.current_button_has_text = False
        self.current_button_attrs = {}

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        attr_dict = dict(attrs)
        
        if tag == 'img':
            alt = attr_dict.get('alt')
            if alt is None or alt.strip() == "":
                self.images_without_alt.append(attr_dict.get('src', 'sem src'))
                
        elif tag == 'button':
            self.current_button_has_text = False
            self.current_button_attrs = attr_dict
            
        elif tag == 'input':
            if not attr_dict.get('aria-label') and not attr_dict.get('aria-labelledby') and not attr_dict.get('id'):
                self.inputs_without_label.append(attr_dict.get('name', 'sem name/id'))

    def handle_data(self, data):
        if self.current_tag == 'button' and data.strip():
            self.current_button_has_text = True

    def handle_endtag(self, tag):
        if tag == 'button':
            if not self.current_button_has_text and not self.current_button_attrs.get('aria-label'):
                self.buttons_without_accessible_name.append(
                    self.current_button_attrs.get('id', 'sem id')
                )
        self.current_tag = None

class TestAcessibilidade(unittest.TestCase):
    def setUp(self):
        self.base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        self.html_files = [
            "index.html",
            "ambiental.html",
            "social.html",
            "economica.html",
            "tutorial.html"
        ]

    def test_alt_em_imagens(self):
        for f in self.html_files:
            path = os.path.join(self.base_dir, f)
            if not os.path.exists(path):
                continue
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            parser = AcessibilidadeParser()
            parser.feed(content)
            
            self.assertEqual(
                len(parser.images_without_alt), 0,
                f"No arquivo {f}, as seguintes imagens não possuem alt descritivo: {parser.images_without_alt}"
            )

    def test_botoes_acessiveis(self):
        for f in self.html_files:
            path = os.path.join(self.base_dir, f)
            if not os.path.exists(path):
                continue
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            parser = AcessibilidadeParser()
            parser.feed(content)
            
            self.assertEqual(
                len(parser.buttons_without_accessible_name), 0,
                f"No arquivo {f}, os seguintes botões não possuem texto ou aria-label: {parser.buttons_without_accessible_name}"
            )

if __name__ == "__main__":
    unittest.main()
