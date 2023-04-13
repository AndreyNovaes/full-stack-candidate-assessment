from scrapy.exceptions import DropItem
import uuid
import sqlite3

# remove os elementos que não possuem os valores necessários
class ScrapyprojectPipeline:
  def process_item(self, item, spider):
    if not item['description'] or not item['price'] or not item['image'] or not item['link'] or not item['category']:
      raise DropItem("Missing values!, item dropped")
    else:
      return item

# remove os elementos duplicados em suspensão(em memória) antes de salvar no banco de dados
class RemoveDuplicatesBeforeSaveDatabasePipeline:
  def __init__(self):
    self.scraped_data_set = set()
  
  def process_item(self, item, spider):
    if item['description'] in self.scraped_data_set and \
       item['price'] in self.scraped_data_set and \
       item['image'] in self.scraped_data_set and \
       item['link'] in self.scraped_data_set:
      raise DropItem("Elemento duplicado, excluido antes de salvar no banco de dados")
    else:
      self.scraped_data_set.add(item['description'])
      return item
    
# salva no banco de dados todos os elementos que passaram pelos 2 primeiros pipelines
class SaveToDatabasePipeline:
  def __init__(self):
    self.conn = sqlite3.connect("scrapped_data.db")
    self.cur = self.conn.cursor()

  def open_spider(self, spider):
    self.cur.execute("CREATE TABLE IF NOT EXISTS scrapped_data (id TEXT PRIMARY KEY,category TEXT, description TEXT, price TEXT, image TEXT, link TEXT)")
    self.conn.commit()
  
  def process_item(self, item, spider):
    self.cur.execute(""" SELECT * FROM scrapped_data
        WHERE category = ? AND description = ? AND price = ? AND image = ? AND link = ?
        """, (item['category'], item['description'], item['price'], item['image'], item['link']))
    result = self.cur.fetchone()
    if result:
      raise DropItem("Elemento duplicado, excluido antes de salvar no banco de dados")
    else:
      # salvo o meu elemento único baseado no link do produto
      id = str(uuid.uuid4())
      self.cur.execute("INSERT INTO scrapped_data VALUES (?, ?, ?, ?, ?, ?)", (id, item['category'], item['description'], item['price'], item['image'], item['link']))
      self.conn.commit()
      return item
  
  def close_spider(self, spider):
    self.conn.close()
