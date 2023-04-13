import scrapy
import scrapyProject.items as items
from ..Generate_urls import Generate_urls

class MeliSpiderSpider(scrapy.Spider):
  name = "meli"

  instancia_generate_urls = Generate_urls()
  categories = [
    '/eletrodomesticos/refrigeracao/geladeiras/geladeira',
    '/celulares-telefones/celulares-smartphones/celulares-smartphones',
    '/eletronicos-audio-video/televisores/tv'
    ]
  
  print(instancia_generate_urls.generate_urls_meli(categories, 2))
  start_urls = instancia_generate_urls.generate_urls_meli(categories, 2)

  def parse(self, response):
    for product in response.xpath('//ol[@class="ui-search-layout ui-search-layout--stack"]'):
      item = items.ScrapyprojectItem()

      self.logger.info(product)
      item["description"] = product.css("h2::text").get()

      yield item
