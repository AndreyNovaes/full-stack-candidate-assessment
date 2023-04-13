import scrapy
from ..Generate_urls import Generate_urls
import scrapyProject.items as items

class BuscapeSpider(scrapy.Spider):
  name = "buscape"
  instancia_generate_urls = Generate_urls()
  
  start_urls = instancia_generate_urls.generate_urls_buscape(["celular", "geladeira", 'tv'], 2)

  def parse(self, response):
    products = response.css(".SearchCard_ProductCard_Inner__7JhKb")

    for product in products:
      item = items.ScrapyprojectItem()

      item["description"] = product.css("h2::text").get()
      item["price"] = product.css("p[data-testid = 'product-card::price']::text").get()
      item["image"] = product.css("img[src^='https']").attrib["src"]
      item["link"] = Generate_urls.mountUrl("https://www.buscape.com.br", product.css("a::attr(href)").get())
      item["category"] = response.url.split("/")[3].split("?")[0]

      yield item
