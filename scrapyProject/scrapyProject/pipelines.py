from scrapy.exceptions import DropItem
import uuid
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

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
        database_url = os.getenv("DATABASE_URL")
        self.conn = psycopg2.connect(database_url)
        self.cur = self.conn.cursor()

    def open_spider(self, spider):
        self.cur.execute("""
            CREATE TABLE IF NOT EXISTS scrapped_data (
                id TEXT PRIMARY KEY,
                category TEXT,
                description TEXT,
                price REAL,
                image TEXT,
                link TEXT,
                website TEXT
            )
        """)
        self.conn.commit()

    def process_item(self, item, spider):
        self.cur.execute("""
            SELECT * FROM scrapped_data
            WHERE category = %s AND description = %s AND price = %s AND image = %s AND link = %s AND website = %s
        """, (item['category'], item['description'], item['price'], item['image'], item['link'], item['website']))
        result = self.cur.fetchone()
        if result:
            raise DropItem("Elemento duplicado, excluido antes de salvar no banco de dados")
        else:
            id = str(uuid.uuid4())
            self.cur.execute("""
                INSERT INTO scrapped_data (id, category, description, price, image, link, website)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (id, item['category'], item['description'], item['price'], item['image'], item['link'], item['website']))
            self.conn.commit()
            return item

    def close_spider(self, spider):
        self.conn.close()

