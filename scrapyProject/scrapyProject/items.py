import scrapy
# from itemloaders.processors import TakeFirst, MapCompose, Join

class ScrapyprojectItem(scrapy.Item):
  category = scrapy.Field()
  description = scrapy.Field()
  price = scrapy.Field()
  image = scrapy.Field()
  link = scrapy.Field()
  website = scrapy.Field()
