import requests
from bs4 import BeautifulSoup

# Example usage: python scraper.py https://example.com
import sys

def scrape_website(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    # Collect all links on the page
    links = [a['href'] for a in soup.find_all('a', href=True)]
    return links

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scraper.py <url>")
        sys.exit(1)
    url = sys.argv[1]
    links = scrape_website(url)
    print("Found links:")
    for link in links:
        print(link)
