#!/usr/bin/env python3
"""
Bilingual Deoghar Dataset Utility Script
Enhanced for both Hindi and English languages
"""

import json
import csv
from pathlib import Path
from typing import Dict, List, Tuple, Any
from collections import defaultdict

class BilingualDeoghirDatasetUtility:
    def __init__(self, dataset_path: str):
        """Initialize with bilingual dataset file path."""
        self.dataset_path = Path(dataset_path)
        self.data = self.load_dataset()
        self.languages = ['en', 'hi']
    
    def load_dataset(self) -> Dict:
        """Load JSON dataset from file."""
        try:
            with open(self.dataset_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Error: Dataset file not found at {self.dataset_path}")
            return {}
        except json.JSONDecodeError:
            print(f"Error: Invalid JSON in {self.dataset_path}")
            return {}
    
    def extract_qa_pairs_bilingual(self) -> Dict[str, List[Dict]]:
        """
        Extract all Q&A pairs from the dataset in both languages.
        Returns: {
            'en': [qa_pairs...],
            'hi': [qa_pairs...]
        }
        """
        qa_pairs = {'en': [], 'hi': []}
        
        domains = ['temples', 'water_bodies', 'nature_and_peaks', 'logistics', 
                   'facilities', 'general_information']
        
        for domain in domains:
            if domain in self.data and 'q_and_a' in self.data[domain]:
                q_and_a = self.data[domain]['q_and_a']
                
                for lang in self.languages:
                    if lang in q_and_a:
                        for qa in q_and_a[lang]:
                            qa_pairs[lang].append({
                                'question': qa.get('question', ''),
                                'answer': qa.get('answer', ''),
                                'domain': domain.replace('_', ' ').title(),
                                'language': 'Hindi' if lang == 'hi' else 'English'
                            })
        
        # Add common questions
        if 'common_questions' in self.data:
            common = self.data['common_questions']
            if isinstance(common, dict):
                for lang in self.languages:
                    if lang in common:
                        for qa in common[lang]:
                            qa_pairs[lang].append({
                                'question': qa.get('question', ''),
                                'answer': qa.get('answer', ''),
                                'domain': 'General',
                                'language': 'Hindi' if lang == 'hi' else 'English'
                            })
        
        return qa_pairs
    
    def get_statistics(self) -> Dict:
        """Get comprehensive dataset statistics."""
        stats = {
            'total_qa_pairs_english': 0,
            'total_qa_pairs_hindi': 0,
            'entities_by_domain': {},
            'total_entities': 0,
            'languages': self.languages
        }
        
        qa_pairs = self.extract_qa_pairs_bilingual()
        stats['total_qa_pairs_english'] = len(qa_pairs.get('en', []))
        stats['total_qa_pairs_hindi'] = len(qa_pairs.get('hi', []))
        stats['total_qa_pairs'] = stats['total_qa_pairs_english'] + stats['total_qa_pairs_hindi']
        
        domains = ['temples', 'water_bodies', 'nature_and_peaks', 'logistics', 
                   'facilities', 'general_information']
        
        for domain in domains:
            if domain in self.data:
                if 'en' in self.data[domain] and isinstance(self.data[domain]['en'], list):
                    count = len(self.data[domain]['en'])
                    stats['entities_by_domain'][domain.replace('_', ' ').title()] = count
                    stats['total_entities'] += count
        
        return stats
    
    def export_qa_to_csv(self, output_path_en: str, output_path_hi: str) -> bool:
        """Export Q&A pairs to separate CSV files for each language."""
        try:
            qa_pairs = self.extract_qa_pairs_bilingual()
            
            # English CSV
            with open(output_path_en, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=['question', 'answer', 'domain', 'language'])
                writer.writeheader()
                writer.writerows(qa_pairs['en'])
            
            # Hindi CSV
            with open(output_path_hi, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=['question', 'answer', 'domain', 'language'])
                writer.writeheader()
                writer.writerows(qa_pairs['hi'])
            
            print(f"✓ Exported {len(qa_pairs['en'])} English Q&A pairs to {output_path_en}")
            print(f"✓ Exported {len(qa_pairs['hi'])} Hindi Q&A pairs to {output_path_hi}")
            return True
        except Exception as e:
            print(f"Error exporting to CSV: {e}")
            return False
    
    def export_qa_to_jsonl(self, output_path_en: str, output_path_hi: str) -> bool:
        """Export Q&A pairs to separate JSONL files for each language."""
        try:
            qa_pairs = self.extract_qa_pairs_bilingual()
            
            # English JSONL
            with open(output_path_en, 'w', encoding='utf-8') as f:
                for qa in qa_pairs['en']:
                    f.write(json.dumps(qa, ensure_ascii=False) + '\n')
            
            # Hindi JSONL
            with open(output_path_hi, 'w', encoding='utf-8') as f:
                for qa in qa_pairs['hi']:
                    f.write(json.dumps(qa, ensure_ascii=False) + '\n')
            
            print(f"✓ Exported {len(qa_pairs['en'])} English Q&A pairs to {output_path_en}")
            print(f"✓ Exported {len(qa_pairs['hi'])} Hindi Q&A pairs to {output_path_hi}")
            return True
        except Exception as e:
            print(f"Error exporting to JSONL: {e}")
            return False
    
    def export_for_lm_finetuning(self, output_path_en: str, output_path_hi: str) -> bool:
        """Export in LLM fine-tuning format for both languages."""
        try:
            qa_pairs = self.extract_qa_pairs_bilingual()
            
            # English fine-tuning format
            with open(output_path_en, 'w', encoding='utf-8') as f:
                for qa in qa_pairs['en']:
                    entry = {
                        "messages": [
                            {"role": "user", "content": qa['question']},
                            {"role": "assistant", "content": qa['answer']}
                        ]
                    }
                    f.write(json.dumps(entry, ensure_ascii=False) + '\n')
            
            # Hindi fine-tuning format
            with open(output_path_hi, 'w', encoding='utf-8') as f:
                for qa in qa_pairs['hi']:
                    entry = {
                        "messages": [
                            {"role": "user", "content": qa['question']},
                            {"role": "assistant", "content": qa['answer']}
                        ]
                    }
                    f.write(json.dumps(entry, ensure_ascii=False) + '\n')
            
            print(f"✓ Exported {len(qa_pairs['en'])} English messages to {output_path_en}")
            print(f"✓ Exported {len(qa_pairs['hi'])} Hindi messages to {output_path_hi}")
            return True
        except Exception as e:
            print(f"Error exporting for fine-tuning: {e}")
            return False
    
    def get_qa_by_domain(self, domain: str, language: str = 'en') -> List[Dict]:
        """Get all Q&A pairs for a specific domain and language."""
        qa_pairs = self.extract_qa_pairs_bilingual()
        
        if language not in qa_pairs:
            return []
        
        return [qa for qa in qa_pairs[language] 
                if qa['domain'].lower() == domain.lower()]
    
    def get_qa_count_by_domain(self, language: str = 'en') -> Dict:
        """Get count of Q&A pairs per domain for a specific language."""
        qa_pairs = self.extract_qa_pairs_bilingual()
        
        if language not in qa_pairs:
            return {}
        
        counts = defaultdict(int)
        for qa in qa_pairs[language]:
            counts[qa['domain']] += 1
        
        return dict(counts)
    
    def print_statistics(self):
        """Print detailed dataset statistics."""
        stats = self.get_statistics()
        
        print("\n" + "="*60)
        print("BILINGUAL DEOGHAR DATASET STATISTICS")
        print("="*60)
        print(f"Total Entities: {stats['total_entities']}")
        print(f"Languages: {', '.join(stats['languages'])}")
        print(f"\nQ&A Pairs by Language:")
        print(f"  • English: {stats['total_qa_pairs_english']} pairs")
        print(f"  • Hindi: {stats['total_qa_pairs_hindi']} pairs")
        print(f"  • TOTAL: {stats['total_qa_pairs']} pairs")
        
        print(f"\nEntities by Domain:")
        for domain, count in stats['entities_by_domain'].items():
            print(f"  • {domain}: {count} entities")
        
        # Show Q&A distribution
        print(f"\nQ&A Pairs by Domain (English):")
        en_counts = self.get_qa_count_by_domain('en')
        for domain, count in sorted(en_counts.items(), key=lambda x: x[1], reverse=True):
            print(f"  • {domain}: {count} pairs")
        
        print(f"\nQ&A Pairs by Domain (Hindi):")
        hi_counts = self.get_qa_count_by_domain('hi')
        for domain, count in sorted(hi_counts.items(), key=lambda x: x[1], reverse=True):
            print(f"  • {domain}: {count} pairs")
        
        print("="*60 + "\n")
    
    def print_sample_qa(self, count: int = 5):
        """Print sample Q&A pairs from each language."""
        qa_pairs = self.extract_qa_pairs_bilingual()
        
        print("\n" + "="*60)
        print("SAMPLE Q&A PAIRS")
        print("="*60)
        
        print("\n--- ENGLISH SAMPLES ---")
        for i, qa in enumerate(qa_pairs['en'][:count], 1):
            print(f"\n{i}. Q: {qa['question']}")
            print(f"   A: {qa['answer'][:100]}...")
        
        print("\n--- HINDI SAMPLES ---")
        for i, qa in enumerate(qa_pairs['hi'][:count], 1):
            print(f"\n{i}. Q: {qa['question']}")
            print(f"   A: {qa['answer'][:100]}...")
        
        print("\n" + "="*60 + "\n")


def main():
    """Main execution function."""
    print("\n" + "="*60)
    print("BILINGUAL DEOGHAR DATASET UTILITY")
    print("="*60)
    
    # Update this path to your dataset location
    dataset_path = "deoghar_dataset_bilingual.json"
    
    utility = BilingualDeoghirDatasetUtility(dataset_path)
    
    # Print statistics
    utility.print_statistics()
    
    # Print sample Q&A pairs
    utility.print_sample_qa(3)
    
    # Export to various formats
    print("Exporting dataset to multiple formats...")
    print("-" * 60)
    
    # CSV exports
    utility.export_qa_to_csv(
        "qa_pairs_english.csv",
        "qa_pairs_hindi.csv"
    )
    
    # JSONL exports
    utility.export_qa_to_jsonl(
        "qa_pairs_english.jsonl",
        "qa_pairs_hindi.jsonl"
    )
    
    # Fine-tuning format exports
    utility.export_for_lm_finetuning(
        "qa_pairs_english_finetuning.jsonl",
        "qa_pairs_hindi_finetuning.jsonl"
    )
    
    print("-" * 60)
    print("\n✓ All operations completed successfully!")
    print("\nGenerated files:")
    print("  • qa_pairs_english.csv - English Q&A in CSV format")
    print("  • qa_pairs_hindi.csv - Hindi Q&A in CSV format")
    print("  • qa_pairs_english.jsonl - English Q&A in JSONL format")
    print("  • qa_pairs_hindi.jsonl - Hindi Q&A in JSONL format")
    print("  • qa_pairs_english_finetuning.jsonl - For LLM fine-tuning (English)")
    print("  • qa_pairs_hindi_finetuning.jsonl - For LLM fine-tuning (Hindi)")


if __name__ == "__main__":
    main()
