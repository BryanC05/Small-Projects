from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.common.by import By
from webdriver_manager.firefox import GeckoDriverManager
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/scrape')
def scrape():
    url = request.args.get('url')
    if not url:
        return jsonify({'error': 'No URL provided'}), 400
    try:
        options = webdriver.FirefoxOptions()
        options.add_argument('--headless')
        driver = webdriver.Firefox(service=FirefoxService(GeckoDriverManager().install()), options=options)
        driver.get(url)

        # Scrape all links
        elements = driver.find_elements(By.TAG_NAME, 'a')
        links = [el.get_attribute('href') for el in elements if el.get_attribute('href')]

        # Scrape all image sources
        img_elements = driver.find_elements(By.TAG_NAME, 'img')
        images = [img.get_attribute('src') for img in img_elements if img.get_attribute('src')]

        # Scrape PDF links
        pdf_links = [link for link in links if link and link.lower().endswith('.pdf')]

        driver.quit()
        return jsonify({'links': links, 'images': images, 'pdfs': pdf_links})
    except Exception as e:
        import traceback
        print('Error scraping:', url)
        traceback.print_exc()
        return jsonify({'error': str(e), 'trace': traceback.format_exc()}), 500

if __name__ == '__main__':
    app.run(debug=True)
